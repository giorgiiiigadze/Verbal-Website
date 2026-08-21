import type { MDXComponents } from "mdx/types";

/// Legal pages are the only MDX in the site and they are pure prose, so the
/// styling lives on the <Prose> wrapper rather than on per-element overrides
/// here. This file exists because @next/mdx requires it at the root.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
