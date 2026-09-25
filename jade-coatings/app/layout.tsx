import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | JADE Coatings",
    default: "JADE Coatings — Premium Water-Based Coatings",
  },
  description:
    "JADE Coatings, a brand of Colour Max Lanka Pvt Ltd. Pioneers in eco-friendly, water-based coating solutions since 2015. Low VOC, UV protection, no added lead or mercury.",
  keywords: [
    "JADE Coatings",
    "water-based paint",
    "eco-friendly coatings",
    "low VOC",
    "Sri Lanka",
    "WOODSHIELD",
    "MASOGUARD",
  ],
  openGraph: {
    title: "JADE Coatings — Premium Water-Based Coatings",
    description:
      "Eco-friendly, water-based coating solutions from Sri Lanka. WOODSHIELD, MASOGUARD, METASHIELD & more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.remove('dark');
              try { localStorage.removeItem('jade-theme'); } catch(e) {}
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${manrope.variable} ${inter.variable} font-sans bg-cream text-charcoal antialiased selection:bg-jade-500 selection:text-white transition-colors duration-200`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
