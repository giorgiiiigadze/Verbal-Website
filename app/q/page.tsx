"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The shared quote page — a port of the standalone renderer that used to live
 * on GitHub Pages at /Verbal/q/. It is only ever a renderer: the quote lives
 * behind a share token in the address bar (the hash), and everything is
 * fetched from, and decided through, the same Supabase edge function. Nothing
 * is stored here and nothing identifies the reader — the token is the whole
 * credential.
 *
 * The token is in the URL hash, which never reaches the server, so this must
 * run in the browser. That is the whole reason the page is a client component.
 *
 * NOTE: the edge function's CORS currently allows only the old GitHub origin.
 * Loading a quote from this domain will fail until `theverbal.app` is added to
 * the function's allowed origins.
 */

const API =
  process.env.NEXT_PUBLIC_QUOTE_API ??
  "https://rglpwlmkwukezvexyups.supabase.co/functions/v1/quote/";

type QuoteItem = {
  description?: string;
  quantity?: number | null;
  unit?: string | null;
  unit_price?: number | null;
};

type Business = {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  taxNumber?: string | null;
  terms?: string | null;
  footerNote?: string | null;
};

type Quote = {
  currency?: string;
  business?: Business;
  number?: string | null;
  numberPrefix?: string | null;
  title?: string | null;
  status?: string | null;
  decidedAt?: string | null;
  expired?: boolean;
  validityDate?: string | null;
  scope?: string[] | null;
  items?: QuoteItem[] | null;
  subtotal?: number | null;
  taxRate?: number | null;
  taxAmount?: number | null;
  total?: number | null;
  clientName?: string | null;
  createdAt?: string | null;
  jobSummary?: string | null;
  notes?: string | null;
  canDecide?: boolean;
};

/** The 32-hex share token, from the hash first and `?t=` as a fallback. */
function readToken(): string | null {
  const hash = window.location.hash.replace(/^#/, "");
  const value = hash || new URLSearchParams(window.location.search).get("t") || "";
  return /^[0-9a-f]{32}$/.test(value) ? value : null;
}

function money(amount: number | null | undefined, currency: string): string {
  if (amount === null || amount === undefined) return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    // An unfamiliar currency code shouldn't cost the reader the whole page.
    return Number(amount).toFixed(2) + " " + currency;
  }
}

function day(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type State =
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "ready"; quote: Quote };

export default function QuotePage() {
  const [state, setState] = useState<State>({ kind: "loading" });
  // The token lives in the URL hash, so it is only knowable in the browser.
  // A ref, not state: it never changes after mount and nothing renders it.
  const tokenRef = useRef<string | null>(null);
  const [deciding, setDeciding] = useState(false);

  useEffect(() => {
    const current = readToken();
    tokenRef.current = current;
    // One promise chain so every setState lands in an async continuation
    // rather than synchronously in the effect body. A missing token is thrown
    // as its own error so the catch can tell the two failures apart.
    Promise.resolve()
      .then(() => {
        if (!current) throw new Error("no-token");
        return fetch(API + current);
      })
      .then((response) => {
        if (!response.ok) throw new Error("unavailable");
        return response.json();
      })
      .then((quote: Quote) => setState({ kind: "ready", quote }))
      .catch((error: unknown) =>
        setState({
          kind: "error",
          message:
            error instanceof Error && error.message === "no-token"
              ? "The address looks incomplete. Ask whoever sent it for a new link."
              : "It may have been withdrawn, or the address may be incomplete.",
        }),
      );
  }, []);

  const decide = useCallback(
    (action: "accept" | "decline") => {
      const token = tokenRef.current;
      if (!token) return;
      // Declining is the one that can't be walked back from here, so it asks.
      if (action === "decline" && !window.confirm("Decline this quote?")) return;
      setDeciding(true);
      fetch(API + token, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })
        .then((response) => response.json())
        .then((quote: Quote) => {
          if (quote && quote.status) {
            setState({ kind: "ready", quote });
            window.scrollTo(0, 0);
          } else {
            setState({
              kind: "error",
              message: "That didn't go through. Please try again.",
            });
          }
        })
        .catch(() =>
          // Reloading is honest here: whether the write landed is unknown, and
          // the page it comes back with is the truth either way.
          setState({
            kind: "error",
            message:
              "That didn't go through. Check your connection and reload.",
          }),
        )
        .finally(() => setDeciding(false));
    },
    [],
  );

  return (
    <div className="quote-root">
      <style>{CSS}</style>
      <div className="sheet">
        {state.kind === "loading" && <p className="muted">Loading…</p>}

        {state.kind === "error" && (
          <>
            <h1>This link isn&apos;t available</h1>
            <p className="muted">{state.message}</p>
          </>
        )}

        {state.kind === "ready" && (
          <QuoteBody
            quote={state.quote}
            deciding={deciding}
            onDecide={decide}
          />
        )}
      </div>
      <footer className="foot">Sent with Verbal</footer>
    </div>
  );
}

function QuoteBody({
  quote,
  deciding,
  onDecide,
}: {
  quote: Quote;
  deciding: boolean;
  onDecide: (action: "accept" | "decline") => void;
}) {
  const currency = quote.currency || "USD";
  const business = quote.business || {};
  const name = (business.name || "").trim() || "Quote";
  const number = quote.number
    ? (quote.numberPrefix || "") + quote.number
    : null;

  const contact = [
    business.phone,
    business.email,
    business.address,
    business.taxNumber,
  ].filter((line) => line && String(line).trim());

  const scope = (quote.scope || []).filter((s) => s && s.trim());

  const banner = (() => {
    if (quote.status === "accepted") {
      return (
        <p className="banner accepted">
          Accepted
          {quote.decidedAt ? " on " + day(quote.decidedAt) : ""}. Thank you —
          we&apos;ll be in touch.
        </p>
      );
    }
    if (quote.status === "declined") {
      return (
        <p className="banner declined">
          Declined{quote.decidedAt ? " on " + day(quote.decidedAt) : ""}.
        </p>
      );
    }
    if (quote.expired) {
      return (
        <p className="banner expired">
          This quote expired on {day(quote.validityDate)}. Get in touch for an
          updated price.
        </p>
      );
    }
    return null;
  })();

  const terms = [business.terms, quote.notes, business.footerNote].filter(
    (text) => text && String(text).trim(),
  );

  return (
    <>
      <header>
        <div>
          <p className="biz-name">{name}</p>
          {contact.map((line, i) => (
            <p className="biz-detail" key={i}>
              {line}
            </p>
          ))}
        </div>
        <div>
          <div className="doc-label">QUOTE</div>
          {number && <div className="doc-number">No. {number}</div>}
        </div>
      </header>

      <h1>{quote.title || "Quote"}</h1>
      {banner}

      <div className="parties">
        {quote.clientName && (
          <div>
            <p className="label">For</p>
            <p>{quote.clientName}</p>
          </div>
        )}
        <div>
          <p className="label">Date</p>
          <p>{day(quote.createdAt)}</p>
        </div>
        {quote.validityDate && (
          <div>
            <p className="label">Valid until</p>
            <p>{day(quote.validityDate)}</p>
          </div>
        )}
      </div>

      {quote.jobSummary && <p className="summary">{quote.jobSummary}</p>}

      {scope.length > 0 && (
        <>
          <h2>Scope of work</h2>
          <ul className="scope">
            {scope.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </>
      )}

      <h2>Costs</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th className="num">Amount</th>
          </tr>
        </thead>
        <tbody>
          {(quote.items || []).map((item, i) => {
            const qty = item.quantity;
            const priced =
              item.unit_price !== null && item.unit_price !== undefined;
            const lineTotal =
              priced && qty !== null && qty !== undefined
                ? qty * (item.unit_price as number)
                : priced
                  ? (item.unit_price as number)
                  : null;
            const qtyLabel =
              qty === null || qty === undefined
                ? ""
                : (Number.isInteger(qty) ? qty : Number(qty).toFixed(2)) +
                  (item.unit ? " " + item.unit : "");
            return (
              <tr key={i}>
                <td>
                  {item.description || "Item"}
                  {qtyLabel && (
                    <>
                      <br />
                      <span className="muted">{qtyLabel}</span>
                    </>
                  )}
                </td>
                {/* "TBC" rather than a zero: a price the tradesperson hasn't
                    got yet is not a price of nothing, and printing 0 would
                    promise it free. */}
                <td className="num">
                  {priced ? money(lineTotal, currency) : "TBC"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="totals">
        <div>
          <span>Subtotal</span>
          <span>{money(quote.subtotal, currency)}</span>
        </div>
        {quote.taxRate != null && quote.taxRate > 0 && (
          <div>
            <span>Tax ({quote.taxRate}%)</span>
            <span>{money(quote.taxAmount, currency)}</span>
          </div>
        )}
        <div className="grand">
          <span>Total</span>
          <span>{money(quote.total, currency)}</span>
        </div>
      </div>

      {terms.length > 0 && (
        <>
          <h2>Terms</h2>
          {terms.map((text, i) => (
            <p className="terms" key={i}>
              {text}
            </p>
          ))}
        </>
      )}

      {quote.canDecide && (
        <div className="actions">
          <button
            className="accept"
            disabled={deciding}
            onClick={() => onDecide("accept")}
          >
            Accept quote
          </button>
          <button
            className="decline"
            disabled={deciding}
            onClick={() => onDecide("decline")}
          >
            Decline
          </button>
        </div>
      )}
    </>
  );
}

/** The original renderer's styles, scoped under `.quote-root` so the receipt
 *  keeps its own system-font, light look independent of the marketing site. */
const CSS = `
.quote-root { min-height: 100%; padding: 24px 16px 64px; background: #F9F9F7; color: #1C1C1E;
  font: 16px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  -webkit-text-size-adjust: 100%; }
.quote-root * { box-sizing: border-box; }
.quote-root .sheet { max-width: 640px; margin: 0 auto; background: #fff;
  border: 1px solid rgba(0,0,0,.08); border-radius: 18px; padding: 28px 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,.04); }
.quote-root header { display: flex; justify-content: space-between; gap: 16px; align-items: flex-start; }
.quote-root .biz-name { font-size: 19px; font-weight: 600; margin: 0 0 4px; }
.quote-root .biz-detail, .quote-root .muted { color: #6b6b70; font-size: 13px; margin: 0; }
.quote-root .doc-label { font-size: 20px; font-weight: 600; letter-spacing: .04em; text-align: right; }
.quote-root .doc-number { color: #6b6b70; font-size: 13px; text-align: right; margin-top: 2px; }
.quote-root h1 { font-family: inherit; font-weight: 700; font-size: 24px; line-height: 1.25; margin: 28px 0 12px; }
.quote-root .parties { display: flex; flex-wrap: wrap; gap: 24px; margin: 20px 0 4px; }
.quote-root .parties div { min-width: 140px; }
.quote-root .parties p { margin: 0; }
.quote-root .label { font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: #8a8a8f; margin: 0 0 2px; }
.quote-root .summary { margin: 20px 0 0; }
.quote-root h2 { font-family: inherit; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: .06em; color: #8a8a8f; margin: 28px 0 8px; }
.quote-root ul.scope { margin: 0; padding-left: 18px; }
.quote-root ul.scope li { margin-bottom: 4px; }
.quote-root table { width: 100%; border-collapse: collapse; margin-top: 4px; }
.quote-root th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .06em;
  color: #8a8a8f; font-weight: 500; padding: 0 0 8px; }
.quote-root th.num, .quote-root td.num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
.quote-root td { padding: 10px 0; border-top: 1px solid rgba(0,0,0,.07); vertical-align: top; }
.quote-root .totals { margin-top: 12px; margin-left: auto; width: 100%; max-width: 280px; }
.quote-root .totals div { display: flex; justify-content: space-between; padding: 6px 0; font-variant-numeric: tabular-nums; }
.quote-root .totals .grand { border-top: 1px solid rgba(0,0,0,.12); margin-top: 4px; padding-top: 10px;
  font-size: 18px; font-weight: 600; }
.quote-root .banner { border-radius: 12px; padding: 12px 14px; margin: 0 0 20px; font-size: 14px; }
.quote-root .banner.accepted { background: #E7F6EC; color: #1B5E33; }
.quote-root .banner.declined { background: #FBEAEA; color: #8A2222; }
.quote-root .banner.expired  { background: #F1F1EF; color: #5c5c60; }
.quote-root .actions { display: flex; gap: 12px; margin-top: 32px; flex-wrap: wrap; }
.quote-root .actions button { flex: 1 1 160px; min-height: 52px; border-radius: 14px; border: 0;
  font-size: 16px; font-weight: 600; cursor: pointer; font-family: inherit; }
.quote-root .actions button[disabled] { opacity: .5; cursor: default; }
.quote-root .accept { background: #192868; color: #fff; }
.quote-root .decline { background: #fff; color: #8A2222; border: 1px solid rgba(138,34,34,.35); }
.quote-root .terms { white-space: pre-wrap; color: #4a4a4f; font-size: 14px; margin: 0 0 10px; }
.quote-root .foot { max-width: 640px; margin: 20px auto 0; text-align: center; color: #9a9a9f; font-size: 12px; }
@media print {
  .quote-root { background: #fff; padding: 0; }
  .quote-root .sheet { border: 0; box-shadow: none; }
  .quote-root .actions { display: none; }
}
`;
