export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import AuthButton from "@/app/utils/AuthButton";

export const metadata: Metadata = {
  title: "Codeblocks",
  description: "A code block sharing website.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="navbar bg-primary justify-between">
          <Link href="/">
            <h1 className="text-3xl font-semibold text-primary-content hover:text-secondary">
              Code Blocks
            </h1>
          </Link>
          <div className="flex gap-2">
            <Link href="/blocks/create" className="btn btn-accent">
              + Create Block
            </Link>
            <AuthButton />
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
