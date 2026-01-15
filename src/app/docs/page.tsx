export default function DocsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-background px-4">
      {/* Hero */}
      <section className="max-w-3xl text-center mt-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          ThingsChat API
        </h1>

        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Developer documentation for integrating ThingsChat into your
          applications, devices, and automations.
        </p>
      </section>

      {/* Docs Link Card */}
      <section className="max-w-2xl w-full mt-16">
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">
            OpenAPI / Swagger Documentation
          </h2>

          <p className="text-muted-foreground mb-6">
            Interactive API documentation, request examples, schemas, and
            authentication details are available at the link below.
          </p>

          <a
            href="https://thingschat-dev.fly.dev/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/80 transition"
          >
            Open API Docs
          </a>

          <p className="mt-4 text-sm text-muted-foreground">
            Opens in a new tab
          </p>
        </div>
      </section>

      {/* Extra Info */}
      <section className="max-w-2xl text-center mt-16 mb-24 text-muted-foreground">
        <p className="leading-relaxed">
          ThingsChat uses token-based authentication with optional
          <code className="mx-1 px-1.5 py-0.5 rounded bg-muted font-mono text-sm">
            x-api-key
          </code>
          headers for paid plans, plus rate limits and real-time updates via
          Server-Sent Events.
        </p>
      </section>
    </main>
  );
}
