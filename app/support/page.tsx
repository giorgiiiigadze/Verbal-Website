import Link from "next/link";
import { SUPPORT_EMAIL } from "@/content/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, graph } from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Support and contact",
  description:
    "How to get help with Verbal, report a problem, cancel a subscription, " +
    "or delete your account.",
  path: "/support",
});

export default function SupportPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbLd("Support", "/support"))} />

      <PageHeader
        eyebrow="Support"
        title="One person reads these"
        lead="There is no ticket queue and no chatbot. Email, and you will get a reply from whoever built the thing you are asking about."
      />

      <Section tone="bg">
        <div className="mx-auto max-w-3xl">
          <Card>
            <h2 className="text-2xl">Get in touch</h2>
            <p className="mt-3 text-muted">
              For anything at all: a bug, a quote that came back wrong, a
              refund question, a trade you want supported properly.
            </p>
            <div className="mt-6">
              <Button href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</Button>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              If you are reporting a problem, the app can do this for you:{" "}
              <strong className="font-semibold text-text">
                Profile → Settings → Help
              </strong>{" "}
              opens an email already carrying your app version and iOS version,
              which is otherwise the first two replies of every conversation.
              Otherwise, tell us what you said, what came back, and roughly when.
            </p>
          </Card>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Card>
              <h2 className="text-lg">Cancelling Verbal Pro</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                The subscription is sold by Apple, so it is cancelled through
                Apple:{" "}
                <strong className="font-semibold text-text">
                  Settings → Apple ID → Subscriptions
                </strong>{" "}
                on your device. Deleting the app does not cancel it, and refunds
                are handled by Apple, so we cannot issue them.
              </p>
            </Card>

            <Card>
              <h2 className="text-lg">Deleting your account</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                In the app:{" "}
                <strong className="font-semibold text-text">
                  Profile → Settings → Delete account
                </strong>
                . It removes your profile, business details, rate card,
                customers, quotes and every transcript, immediately and
                permanently. It cannot be undone, and it is separate from
                cancelling the subscription.
              </p>
            </Card>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Card>
              <h2 className="text-lg">A quote came back wrong</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Every line is editable before you send. If something is priced
                oddly, check the rate on your rate card first. The app prices
                from your numbers, and will flag anything it has no number for
                rather than guess one.
              </p>
            </Card>

            <Card>
              <h2 className="text-lg">A copy of your data</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Email and ask. You can also ask us to correct it. Deletion is
                built into the app and takes effect immediately. See the{" "}
                <Link href="/privacy" className="text-accent-text underline">
                  privacy policy
                </Link>{" "}
                for the full list of your rights.
              </p>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
