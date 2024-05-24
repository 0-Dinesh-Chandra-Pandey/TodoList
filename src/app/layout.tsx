import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "../store/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Todo App",
    description: "Simple Todo Application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ContextProvider>{children}</ContextProvider>
            </body>
        </html>
    );
}
