import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex h-screen flex-col">
      <main className="flex-1 wrapper">{children}</main>
    </div>
  );
}
