import type { Metadata } from "next";
import "@/styles/globals.scss";
import { gilroy, poppins } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "SoftSuite",
  description:
    "HR Management application which addresses challenges and provides solutions in the HR Industry",
  keywords: ["HR", "ERP", "Office", "HR Management"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${gilroy.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
