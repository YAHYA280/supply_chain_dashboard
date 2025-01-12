"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#333", color: "white" }}>
      <Link href="/" style={{ marginRight: "1rem", color: "white" }}>
        Home
      </Link>
      <Link href="/dashboard" style={{ color: "white" }}>
        Dashboard
      </Link>
    </nav>
  );
}
