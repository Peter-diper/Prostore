import "@/assets/styles/globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">{children}</main>
      <Footer />
    </div>
  );
}
