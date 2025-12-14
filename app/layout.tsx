import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../component/header";
import { Footer } from "../component/footer";

export const metadata: Metadata = {
  title: "Zibook | رزرو آنلاین سالن زیبایی ",
  description: "نوبت خود را آنلاین رزرو کنید، بدون انتظار و تماس تلفنی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-IR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet"></link>
      </head>
          <body  >
            <Header />
            <main >
              {children}
            </main>
            <Footer />
          </body>
        </html>
        );
}
