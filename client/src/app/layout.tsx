import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/redux/store_provider";
import { Toaster } from "sonner";
import AuthInitializer from "@/lib/auth/AuthInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connect",
  description: "Chat app used for connect securely with people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-wa-bg-dark">
        <StoreProvider>
          <AuthInitializer>
            {children}
            <Toaster
              position="top-center"
              theme="dark"
              richColors
              toastOptions={{
                style: {
                  width: "fit-content",
                },
              }}
            />
          </AuthInitializer>
        </StoreProvider>
      </body>
    </html>
  );
}
