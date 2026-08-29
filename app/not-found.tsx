import { Container } from "@/components/layout/Container";

/**
 * The 404: the dark end of the brand ramp, and one sentence on it.
 *
 * Nothing else on purpose — no code, no card, no button. The header is still
 * above it and the footer still below it, so there is already a way out of the
 * page without this repeating one.
 *
 * `min-h-lvh` matches the `main` this renders into, so the gradient covers
 * exactly the sheet the footer slides out from behind — see RootLayout.
 *
 * No `metadata` export: the file convention documents that only for
 * `global-not-found`, and Next injects `noindex` on a 404 response itself.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-lvh items-center bg-linear-to-br from-royal-600 via-royal-700 to-royal-800 text-white">
      <Container className="py-32">
        <h1 className="mx-auto max-w-3xl text-center font-slab text-[clamp(2.5rem,9vw,5.5rem)] leading-[1.02] tracking-tight">
          This page doesn&rsquo;t exist.
        </h1>
      </Container>
    </div>
  );
}
