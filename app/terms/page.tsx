import Content from "@/content/terms.mdx";
import { Prose } from "@/components/ui/Prose";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, graph } from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "What Verbal does, what it costs, and who is responsible for what. The " +
    "quote is your document and your offer: read it before you send it.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbLd("Terms of Service", "/terms"))} />
      <Prose>
        <Content />
      </Prose>
    </>
  );
}
