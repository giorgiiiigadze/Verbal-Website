/**
 * The site's one route into Supabase's REST API.
 *
 * Deliberately `fetch` rather than `@supabase/supabase-js`: the only thing the
 * site does is select from one table and insert into another, and the client
 * library is a dependency, a bundle and an auth session for two HTTP calls.
 * `/q` already talks to the same project this way — see app/q/page.tsx.
 *
 * Server-only. The key is not `NEXT_PUBLIC_`, so importing this from a client
 * component gets an undefined key and a thrown config error rather than a
 * silent 401 in a browser.
 */

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const KEY = process.env.SUPABASE_PUBLISHABLE_KEY;

/** Thrown when the environment is not configured, so a caller can tell the
 *  difference between "the wishlist is empty" and "this deploy has no keys". */
export class SupabaseNotConfigured extends Error {
  constructor() {
    super(
      "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY must both be set",
    );
    this.name = "SupabaseNotConfigured";
  }
}

function credentials() {
  if (!URL_BASE || !KEY) throw new SupabaseNotConfigured();
  return { base: URL_BASE, key: KEY };
}

export const isSupabaseConfigured = Boolean(URL_BASE && KEY);

/**
 * A PostgREST GET. `path` is the table and its query
 * (`wishlist_items?select=*&order=position`).
 *
 * `revalidate` is the caller's, because the two readers want opposite things:
 * a board that changes a few times a month should be cached, and anything
 * read inside a mutation should not be.
 */
export async function selectFrom<T>(
  path: string,
  { revalidate = 60 }: { revalidate?: number | false } = {},
): Promise<T[]> {
  const { base, key } = credentials();

  const res = await fetch(`${base}/rest/v1/${path}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    next: revalidate === false ? undefined : { revalidate },
    cache: revalidate === false ? "no-store" : undefined,
  });

  if (!res.ok) {
    throw new Error(
      `Supabase GET ${path} failed: ${res.status} ${await res.text()}`,
    );
  }
  return (await res.json()) as T[];
}

/**
 * A PostgREST INSERT. Returns nothing: every table the site writes to is
 * insert-only with no select policy, so asking for the row back would be a
 * guaranteed empty array at best and a 401 at worst.
 */
/** Raised when an insert collides with a UNIQUE constraint. Its own class so
 *  a caller can decide what a duplicate means: for a signup it means the
 *  person is already on the list, which is the outcome they wanted. */
export class DuplicateRow extends Error {
  constructor(table: string) {
    super(`Supabase POST ${table}: row already exists`);
    this.name = "DuplicateRow";
  }
}

/**
 * A PostgREST INSERT. Returns nothing: every table the site writes to is
 * insert-only with no select policy, so asking for the row back would be a
 * guaranteed empty array at best and a 401 at worst.
 *
 * Deliberately never sends `on_conflict`. PostgREST treats that parameter as
 * an upsert and requires an UPDATE policy on the table even when the
 * resolution is ignore-duplicates, which would mean granting anonymous
 * visitors the right to update rows in order to avoid one error code. The
 * duplicate is raised here instead and handled by the caller.
 */
export async function insertInto(
  table: string,
  row: Record<string, unknown>,
): Promise<void> {
  const { base, key } = credentials();

  const res = await fetch(`${base}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      // Without return=minimal PostgREST tries to return the inserted row,
      // which RLS then refuses to show it.
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
    cache: "no-store",
  });

  if (res.ok) return;

  const text = await res.text();
  // 23505 is Postgres' unique_violation, which PostgREST reports as 409.
  if (res.status === 409 || text.includes("23505")) {
    throw new DuplicateRow(table);
  }
  throw new Error(`Supabase POST ${table} failed: ${res.status} ${text}`);
}
