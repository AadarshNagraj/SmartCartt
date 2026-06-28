import type { Metadata } from "next";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { SearchProvider } from "@/components/search/SearchProvider";
import { SearchOverlay } from "@/components/search/SearchOverlay/SearchOverlay";
import { CartDrawer } from "@/components/cart/CartDrawer/CartDrawer";
import { CartSynchronizer } from "@/components/cart/CartSynchronizer/CartSynchronizer";
import { CommerceProvider } from "@/providers/CommerceProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { Space_Grotesk, Manrope } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { ConsentProvider } from "@/components/analytics/ConsentProvider";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import "@/styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://smartcart.sbs'),
  title: "SmartCart - Shop Smart. Live Better.",
  description: "Premium modern headless Shopify ecommerce store.",
  openGraph: {
    title: "SmartCart",
    description: "Premium modern headless Shopify ecommerce store.",
    url: "/",
    siteName: "SmartCart",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartCart",
    description: "Premium modern headless Shopify ecommerce store.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SmartCart",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://smartcart.sbs",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://smartcart.sbs"}/logo.png`,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SmartCart",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://smartcart.sbs",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${process.env.NEXT_PUBLIC_SITE_URL || "https://smartcart.sbs"}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ConsentProvider>
          <AnalyticsProvider />
          <CommerceProvider>
            <AuthProvider>
              <ToastProvider>
                <SearchProvider>
                  <LayoutWrapper>
                    {children}
                  </LayoutWrapper>
                  <SearchOverlay />
                  <CartDrawer />
                  <CartSynchronizer />
                </SearchProvider>
              </ToastProvider>
            </AuthProvider>
          </CommerceProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
