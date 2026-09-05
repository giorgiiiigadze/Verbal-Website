import Content from "@/content/privacy.mdx";
import { Prose } from "@/components/ui/Prose";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, graph } from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "What Verbal collects, where it goes, and how to get rid of it. Your " +
    "voice never leaves your phone.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbLd("Privacy Policy", "/privacy"))} />
      <Prose>
        <Content />
      </Prose>
    </>
  );
}
