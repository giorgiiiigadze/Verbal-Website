import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center pb-32 pt-40 text-center">
      <p className="font-slab text-sm tracking-[0.2em] text-accent-text">404</p>
      <h1 className="mt-4 font-slab text-4xl">Nothing here.</h1>
      <p className="mt-4 max-w-md text-muted">
        The page you were after has moved or never existed. The quote you were
        sent, if that is what you are looking for, is at the link in your
        message.
      </p>
      <div className="mt-8">
        <Button href="/">Back to the start</Button>
      </div>
    </Container>
  );
}
