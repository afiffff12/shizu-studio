import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Animations from "@/components/Animations";
import PageTransition from "@/components/PageTransition";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "Shizu — Japanese Interior Design Studio", template: "%s — Shizu Studio" },
  description: "Shizu is a Japanese interior design studio in Semarang creating homes, cafés, restaurants and offices built around comfort, atmosphere and the way a room makes you feel.",
  openGraph: { title: "Shizu — Japanese Interior Design Studio", description: "Thoughtful spaces, inspired by Japan.", type: "website" },
};

export const viewport: Viewport = { themeColor: "#f4f0ea" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Manrope:wght@400;500;600&family=Noto+Serif+JP:wght@400&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Preloader />
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
        <Cursor />
        <PageTransition />
        <Animations />
      </body>
    </html>
  );
}
