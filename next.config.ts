import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // The two legal pages are authored as MDX under content/ and imported by a
  // wrapper page. Registering the extensions is what lets the loader pick
  // them up.
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Named as strings, not imported: Turbopack cannot pass JS functions to
    // Rust, so an `import rehypeSlug from ...` here would fail to build.
    //
    // gfm — the privacy policy carries a table of sub-processors, which plain
    //   markdown has no syntax for.
    // slug — gives headings ids, so the policy's own in-page link to
    //   "Information about your customers" resolves.
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
