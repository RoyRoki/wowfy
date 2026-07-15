/**
 * Renders a JSON-LD structured-data block. Server-safe (no client JS).
 * Use for Organization, WebSite, Person, BreadcrumbList, CreativeWork, etc.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Content is developer-authored, not user input — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
