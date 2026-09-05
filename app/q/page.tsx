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
 * Loading a quote from this domain, or from localhost, will fail until those
 * origins are added to the function's allowed list. That is the fix; there is
 * deliberately no local stand-in for the function any more, because the only
 * quotes this site should ever render are real ones.
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

  // Mirrors QuoteDocument's split: contact lines (phone/email/address) read
  // as one block under the business name, and the tax number gets its own
  // line rather than sitting in the list unlabelled.
  const businessContact = [business.phone, business.email, business.address]
    .filter((line) => line && String(line).trim());
  const taxNumber = business.taxNumber?.trim();

  const scope = (quote.scope || []).filter((s) => s && s.trim());
  const items = quote.items || [];
  const unpriced = items.filter(
    (item) => item.unit_price === null || item.unit_price === undefined,
  ).length;

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

  // Terms and notes print as their own labelled blocks in the PDF
  // (QuoteDocumentPage.footerBlock) rather than run together.
  const termsText = business.terms?.trim();
  const notesText = [quote.notes, business.footerNote]
    .filter((text) => text && String(text).trim())
    .join(" ");

  return (
    <>
      {/* Quote no. / Issued / Valid until — the PDF's header row. */}
      <div className="doc-header">
        <div>
          <p className="field-label">Quote no.</p>
          <p className="doc-meta-value">{number || "—"}</p>
        </div>
        <div className="doc-meta">
          <div>
            <p className="field-label">Issued</p>
            <p className="doc-meta-value">{day(quote.createdAt)}</p>
          </div>
          {quote.validityDate && (
            <div>
              <p className="field-label">Valid until</p>
              <p className="doc-meta-value">{day(quote.validityDate)}</p>
            </div>
          )}
        </div>
      </div>

      <div className="rule" />

      {/* From / To — the PDF's partiesRow, split by a vertical divider. */}
      <div className="parties">
        <div className="party">
          <p className="field-label">From</p>
          <p className="party-name">{name}</p>
          {businessContact.map((line, i) => (
            <p className="party-detail" key={i}>
              {line}
            </p>
          ))}
          {taxNumber && <p className="party-detail">Tax no. {taxNumber}</p>}
        </div>
        <div className="party-divider" aria-hidden="true" />
        <div className="party">
          <p className="field-label">To</p>
          <p className="party-name">{quote.clientName || "Client"}</p>
        </div>
      </div>

      <div className="rule" />

      <h1>{quote.title || "Quote"}</h1>
      {banner}

      {quote.jobSummary && (
        <div className="field-block">
          <p className="field-label">Job summary</p>
          <p className="summary">{quote.jobSummary}</p>
        </div>
      )}

      {scope.length > 0 && (
        <div className="field-block">
          <p className="field-label">Scope of work</p>
          <ul className="scope">
            {scope.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {items.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th className="num">Qty</th>
              <th className="num">Unit price</th>
              <th className="num">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
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
                  ? "—"
                  : (Number.isInteger(qty) ? qty : Number(qty).toFixed(2)) +
                    (item.unit ? " " + item.unit : "");
              return (
                <tr key={i}>
                  <td>{item.description || "Item"}</td>
                  <td className="num">{qtyLabel}</td>
                  <td className="num">
                    {priced ? money(item.unit_price as number, currency) : "—"}
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
      )}

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
        {unpriced > 0 && (
          <p className="unpriced-note">
            Excludes {unpriced} item{unpriced === 1 ? "" : "s"} still to be
            confirmed
          </p>
        )}
      </div>

      {termsText && (
        <div className="field-block">
          <p className="field-label">Terms</p>
          <p className="terms">{termsText}</p>
        </div>
      )}
      {notesText && (
        <div className="field-block">
          <p className="field-label">Notes</p>
          <p className="terms">{notesText}</p>
        </div>
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

/**
 * Modelled on the real thing: Verbal/Views/Quotes/QuoteDocumentPage.swift,
 * the SwiftUI view rendered to the PDF a quote ships as. Same ink accent
 * (#192868, QuoteDocumentPage.ink), the same Quote no. / Issued / Valid
 * until header, the From/To parties row with its vertical divider, the
 * uppercase tracked field labels, and a four-column line-item table with
 * a rule between every row rather than a plain HTML table border.
 *
 * Scoped under `.quote-root` so the sheet keeps its own light, print-styled
 * look independent of the marketing site's theme.
 */
const CSS = `
.quote-root { min-height: 100%; padding: 24px 16px 64px; background: #F9F9F7; color: #1C1C1E;
  font: 16px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  -webkit-text-size-adjust: 100%; }
.quote-root * { box-sizing: border-box; }
.quote-root .sheet { max-width: 640px; margin: 0 auto; background: #fff;
  border: 1px solid rgba(0,0,0,.08); border-radius: 18px; padding: 32px 28px;
  box-shadow: 0 1px 3px rgba(0,0,0,.04); }

/* fieldLabel — QuoteDocumentPage's fieldLabel: uppercase, tracked, faint. */
.quote-root .field-label { font-size: 11px; font-weight: 600; letter-spacing: .07em;
  text-transform: uppercase; color: rgba(0,0,0,.45); margin: 0 0 4px; }
.quote-root .field-block { margin-top: 22px; }

/* header — quoteNumber + headerMetadata. */
.quote-root .doc-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap; }
.quote-root .doc-meta { display: flex; gap: 24px; }
.quote-root .doc-meta-value { font-size: 14px; font-weight: 600; color: rgba(0,0,0,.8); margin: 0; }

/* sectionRule — a full-width divider between header / parties / body. */
.quote-root .rule { height: 1px; background: rgba(0,0,0,.20); margin: 18px 0; }

/* partiesRow — From / To, split by a vertical rule like the PDF's letterhead. */
.quote-root .parties { display: flex; align-items: stretch; gap: 24px; }
.quote-root .party { flex: 1 1 0; min-width: 0; }
.quote-root .party-divider { width: 1px; background: rgba(0,0,0,.20); align-self: stretch; }
.quote-root .party-name { font-size: 17px; font-weight: 600; color: #1C1C1E; margin: 0 0 6px; }
.quote-root .party-detail { color: rgba(0,0,0,.65); font-size: 13px; margin: 0 0 2px; }

.quote-root h1 { font-family: inherit; font-weight: 700; font-size: 22px; line-height: 1.25; margin: 22px 0 0; }
.quote-root .summary { color: rgba(0,0,0,.75); margin: 0; }

.quote-root ul.scope { margin: 0; padding: 0; list-style: none; }
.quote-root ul.scope li { position: relative; padding-left: 16px; margin-bottom: 6px; color: rgba(0,0,0,.8); }
.quote-root ul.scope li::before { content: "•"; position: absolute; left: 0; color: rgba(0,0,0,.5); }

/* lineItemTable — Description / Qty / Unit price / Amount, a rule per row. */
.quote-root table { width: 100%; border-collapse: collapse; margin-top: 24px; }
.quote-root th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .06em;
  color: rgba(0,0,0,.55); font-weight: 600; padding: 0 0 8px; border-bottom: 1px solid rgba(0,0,0,.18); }
.quote-root th.num, .quote-root td.num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
.quote-root td { padding: 10px 0; border-top: 1px solid rgba(0,0,0,.10); vertical-align: top; font-size: 14px; color: rgba(0,0,0,.85); }

/* totals — right-aligned, ink-coloured grand total, like QuoteDocumentPage.totals. */
.quote-root .totals { margin-top: 16px; margin-left: auto; width: 100%; max-width: 280px; }
.quote-root .totals div { display: flex; justify-content: space-between; padding: 5px 0; font-variant-numeric: tabular-nums;
  color: rgba(0,0,0,.65); }
.quote-root .totals .grand { border-top: 1px solid rgba(0,0,0,.12); margin-top: 4px; padding-top: 10px;
  font-size: 17px; font-weight: 600; color: #192868; }
.quote-root .unpriced-note { text-align: right; color: rgba(0,0,0,.5); font-size: 12px; margin: 4px 0 0; }

.quote-root .banner { border-radius: 12px; padding: 12px 14px; margin: 20px 0 0; font-size: 14px; }
.quote-root .banner.accepted { background: #E7F6EC; color: #1B5E33; }
.quote-root .banner.declined { background: #FBEAEA; color: #8A2222; }
.quote-root .banner.expired  { background: #F1F1EF; color: #5c5c60; }

.quote-root .actions { display: flex; gap: 12px; margin-top: 32px; flex-wrap: wrap; }
.quote-root .actions button { flex: 1 1 160px; min-height: 52px; border-radius: 14px; border: 0;
  font-size: 16px; font-weight: 600; cursor: pointer; font-family: inherit; }
.quote-root .actions button[disabled] { opacity: .5; cursor: default; }
.quote-root .accept { background: #192868; color: #fff; }
.quote-root .decline { background: #fff; color: #8A2222; border: 1px solid rgba(138,34,34,.35); }

.quote-root .terms { white-space: pre-wrap; color: rgba(0,0,0,.7); font-size: 13px; margin: 0; }
.quote-root .muted { color: #6b6b70; font-size: 13px; margin: 0; }
.quote-root .foot { max-width: 640px; margin: 20px auto 0; text-align: center; color: #9a9a9f; font-size: 12px; }
@media print {
  .quote-root { background: #fff; padding: 0; }
  .quote-root .sheet { border: 0; box-shadow: none; }
  .quote-root .actions { display: none; }
}
`;
