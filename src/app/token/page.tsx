"use client";

import React, { useEffect, useState } from "react";

export default function TokenPage() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing token from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("thingschat_token");
    if (saved) setToken(saved);
    setMounted(true);
  }, []);

  const generateToken = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/token`;
      console.log("Generating token via URL:", url);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY || "",
        },
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to generate token");
      }

      const data = await res.json();
      console.log("Token generated:", data);

      const newToken = data.token.token;

      // Persist locally
      localStorage.setItem("thingschat_token", newToken);
      setToken(newToken);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-neutral-900 border border-neutral-700 rounded-xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Generate Your API Token
        </h1>

        <p className="text-neutral-400 text-center mb-6">
          You can generate one free token per IP address. This token allows your
          IoT devices and ThingsChat clients to send messages.
        </p>

        {token && (
          <div className="mb-6 border border-neutral-700 bg-neutral-800 p-4 rounded-lg">
            <p className="text-neutral-300 text-sm mb-1">Your Token:</p>
            <code className="text-green-400 break-all">{token}</code>
          </div>
        )}

        {error && (
          <div className="mb-4 text-red-400 text-sm bg-red-950 border border-red-700 rounded p-3">
            {error}
          </div>
        )}

        {token ? (
          <div className="space-y-4">
            {/* <button
              onClick={generateToken}
              disabled={loading}
              className="w-full py-3 rounded-lg border border-border hover:bg-accent transition font-medium disabled:opacity-50"
            >
              {loading ? "Regenerating..." : "Regenerate Token"}
            </button> */}
          </div>
        ) : (
          <button
            onClick={generateToken}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-medium disabled:opacity-50"
          >
            {loading
              ? "Generating..."
              : token
              ? "Regenerate Token"
              : "Generate Token"}
          </button>
        )}
      </div>
    </div>
  );
}
