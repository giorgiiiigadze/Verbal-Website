import { NextRequest, NextResponse } from "next/server";

/**
 * Local stand-in for the Supabase edge function `/q` fetches from, so the
 * share-link page can be exercised on localhost without hitting the real
 * function's CORS allowlist (see app/q/page.tsx). Dev-only: not built or
 * routed in production, just a fixture server for `npm run dev`.
 *
 * State lives in memory for the life of the dev process, keyed by token, so
 * accept/decline actually stick across a reload while you're testing.
 */

type Quote = {
  currency: string;
  business: {
    name: string;
    phone: string;
    email: string;
    address: string;
    taxNumber: string;
    terms: string;
    footerNote: string;
  };
  number: string;
  numberPrefix: string;
  title: string;
  status: string | null;
  decidedAt: string | null;
  expired: boolean;
  validityDate: string;
  scope: string[];
  items: { description: string; quantity: number; unit: string; unit_price: number | null }[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  clientName: string;
  createdAt: string;
  jobSummary: string;
  notes: string;
  canDecide: boolean;
};

function freshQuote(): Quote {
  const subtotal = 640;
  const taxRate = 8.5;
  const taxAmount = Math.round(subtotal * (taxRate / 100) * 100) / 100;
  return {
    currency: "USD",
    business: {
      name: "Riverside Plumbing Co.",
      phone: "(555) 019-4432",
      email: "hello@riversideplumbing.example",
      address: "142 Elm Street, Riverside",
      taxNumber: "TAX-88213",
      terms: "50% deposit on acceptance, balance due on completion.",
      footerNote: "Thanks for the opportunity to quote this job.",
    },
    number: "0042",
    numberPrefix: "Q-",
    title: "Water heater replacement",
    status: null,
    decidedAt: null,
    expired: false,
    validityDate: new Date(Date.now() + 14 * 86400000).toISOString(),
    scope: [
      "Remove and dispose of existing 40-gallon water heater",
      "Install new 50-gallon unit, code-compliant venting",
      "Pressure-test lines and confirm hot water at all fixtures",
    ],
    items: [
      { description: "50-gallon water heater unit", quantity: 1, unit: "unit", unit_price: 480 },
      { description: "Labor", quantity: 4, unit: "hr", unit_price: 35 },
      { description: "Disposal of old unit", quantity: 1, unit: "unit", unit_price: 20 },
      // Unpriced on purpose — mirrors QuoteDocumentPage's "Excludes N items
      // still to be confirmed" case, and /q renders this row as "TBC".
      { description: "Permit fee, if required by inspector", quantity: 1, unit: "unit", unit_price: null },
    ],
    subtotal,
    taxRate,
    taxAmount,
    total: Math.round((subtotal + taxAmount) * 100) / 100,
    clientName: "Dana Whitfield",
    createdAt: new Date().toISOString(),
    jobSummary:
      "Existing heater is leaking at the base and past its rated life; replacing " +
      "with a same-day swap so hot water is out for one afternoon at most.",
    // Mirrors QuoteDocumentPage's Terms + Notes footer blocks — both surface
    // through /q's single "terms" list, business.terms first.
    notes: "Quote valid for 14 days from the date above.",
    canDecide: true,
  };
}

const store = new Map<string, Quote>();

function getOrCreate(token: string): Quote {
  let quote = store.get(token);
  if (!quote) {
    quote = freshQuote();
    store.set(token, quote);
  }
  return quote;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  return NextResponse.json(getOrCreate(token));
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const quote = getOrCreate(token);
  const body = (await req.json().catch(() => ({}))) as { action?: string };

  if (body.action === "accept" || body.action === "decline") {
    quote.status = body.action === "accept" ? "accepted" : "declined";
    quote.decidedAt = new Date().toISOString();
    quote.canDecide = false;
    store.set(token, quote);
  }

  return NextResponse.json(quote);
}
