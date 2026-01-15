"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("thingschat_token");
    if (saved) setToken(saved);
    setMounted(true);
  }, []);

  const generateToken = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY || "",
          },
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to generate token");
      }

      const data = await res.json();
      const newToken = data.token.token;

      localStorage.setItem("thingschat_token", newToken);
      setToken(newToken);
    } catch (e: any) {
      setError(e.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen px-6">
      {/* HERO + INTRODUCTION */}
      <section className="max-w-3xl mx-auto pt-20 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          ThingsChat
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          
        </p>
      </section>

      {/* ======================================== */}
      {/* GET STARTED (TOKEN + API ACCESS) */}
      {/* ======================================== */}
      <section className="max-w-3xl mx-auto mt-20 space-y-8">
        <div className="rounded-2xl border border-border bg-card p-10 shadow-sm">
          <p className="text-m text-muted-foreground leading-relaxed mb-6 text-center">
            Messaging infrastructure for connected systems. ThingsChat provides a chat platform with token-based access, read/write rate limits, and live message streaming via Server-Sent Events (SSE). Send messages to <em>things</em>, read the latest updates, or subscribe to live streams — all in real time.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-center">
            Get Started
          </h2>

          <p className="text-m text-muted-foreground leading-relaxed mb-6 text-center">
            Access to ThingsChat is controlled via tokens. Each token defines which things can be written to, read from, and subscribed to. Free tokens are rate limited and ideal for testing and prototyping.
          </p>

          {/* TOKEN CARD */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Generate a Token</h3>

            <p className="text-xs text-muted-foreground mb-4">
              One free token per IP address. No signup required.
            </p>

            {token && (
              <div className="mb-4 rounded-lg border border-border bg-muted p-4 flex items-center justify-between">
                <code className="block text-xs break-all">{token}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(token)}
                  className="text-xs text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  Copy
                </button>
              </div>
            )}

            {error && (
              <div className="mb-4 text-xs text-destructive border border-destructive/30 bg-destructive/10 rounded p-3">
                {error}
              </div>
            )}

            {!token && (
              <button
                onClick={generateToken}
                disabled={loading}
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50"
              >
                {loading ? "Generating…" : "Generate Token"}
              </button>
            )}

            {token && (
              <p className="text-xs text-muted-foreground mt-4">
                Store this token securely. It grants access to your ThingsChat resources.
              </p>
            )}
          </div>

          {/* FIRST REQUEST EXAMPLE */}
          {token && (
            <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-sm">
              <h4 className="text-sm font-semibold mb-2">First Request</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Here’s an example of sending a message using your token:
              </p>
              <pre className="text-xs bg-neutral-900 text-white p-3 rounded overflow-auto">
                {`curl -X POST https://thingschat-dev.fly.dev/${token}/chat/example \\
  -H "Content-Type: application/json" \\
  -d '{"message":"Hello ThingsChat"}'`}
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* ======================================== */}
      {/* DOCUMENTATION */}
      {/* ======================================== */}
      <section className="max-w-3xl mx-auto mt-20 text-center">
        <div className="rounded-2xl border border-border bg-card p-10 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Documentation</h3>

          <p className="text-sm text-muted-foreground mb-6">
            The full OpenAPI specification includes endpoint definitions, authentication details, rate limits, and live examples.
          </p>

          <a
            href="https://thingschat-dev.fly.dev/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            View OpenAPI documentation
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-32 pb-12 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ThingsChat
      </footer>
    </main>
  );
}
