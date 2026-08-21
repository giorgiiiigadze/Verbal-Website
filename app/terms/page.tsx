import Content from "@/content/terms.mdx";
import { Prose } from "@/components/ui/Prose";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "What Verbal does, what it costs, and who is responsible for what.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Prose>
      <Content />
    </Prose>
  );
}
