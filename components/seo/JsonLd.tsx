/**
 * One JSON-LD tag.
 *
 * A server component with no state and no styling: it exists so pages say
 * `<JsonLd data={...} />` rather than repeating the script element and the
 * `dangerouslySetInnerHTML` dance each time.
 *
 * The `<` escape is the standard defence for JSON inside a script element: a
 * string in the data containing `</script>` would otherwise close the tag and
 * the rest would be parsed as markup. Nothing on this site contains one today,
 * which is exactly why it is easy to forget when something does.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
