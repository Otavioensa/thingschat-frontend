export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      {/* Hero Section */}
      <section className="max-w-3xl text-center mt-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          ThingsChat
        </h1>

        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          ThingsChat lets sensors, automations, and connected systems
          communicate with each other, making your IoT ecosystem easier to
          understand and debug.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <a
            href="/token"
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/80 transition"
          >
            Generate Token
          </a>

          <a
            href="/pricing"
            className="px-6 py-3 rounded-lg border border-border font-medium hover:bg-accent hover:text-accent-foreground transition"
          >
            View Paid Plans
          </a>
        </div>
      </section>

      {/* Description Section */}
      <section className="max-w-2xl text-center mt-20 mb-24 text-muted-foreground">
        <p className="leading-relaxed">
          ThingsChat helps you transform your free-form thoughts into
          structured, meaningful conversations using simple API calls. No
          complexity. No friction. Just your ideas — brought to life.
        </p>
      </section>
    </main>
  );
}
