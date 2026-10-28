import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "CINORS | Civil Engineering, Structural Design & Home Planning in Tamil Nadu",
  description: "Bought a plot & don't know where to start? CINORS helps landowners across Tamil Nadu plan their dream home with 2D floor plans, structural safety drawings, Vastu layouts, and 3D elevations.",
  keywords: [
    "Civil Engineering Tamil Nadu",
    "Structural Design Drawings Chennai",
    "House Planning Tamil Nadu",
    "2D Floor Planning",
    "Vastu Layouts",
    "3D Elevation Design",
    "Home Design Chennai",
    "Tamil Nadu Construction Plans",
    "CINORS",
    "CINORS Design"
  ],
  authors: [{ name: "CINORS" }],
  creator: "CINORS",
  publisher: "CINORS",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "CINORS | Civil Engineering, Structural Design & Home Planning",
    description: "Convert your Tamil Nadu plot into a construction-ready home with professional engineering and architectural layouts.",
    url: "https://cinors.com",
    siteName: "CINORS",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#081c3a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} scroll-smooth`}>
      <body
        className="antialiased min-h-screen bg-white text-navy-950 font-sans selection:bg-orange-500 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
