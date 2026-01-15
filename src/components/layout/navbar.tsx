"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="border-b bg-white/70 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold text-lg">
          ThingsChat
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/docs"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Docs
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Pricing
          </Link>

          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
