"use client";
// import { Head } from "next/document";
import { Josefin_Sans } from "next/font/google";
import Head from "next/head";
import { createContext, useEffect, useState } from "react";

const josefin_Sans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin_Sans",
  display: "swap",
});


export interface ThemeContextType {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}
export const ThemeContext = createContext<ThemeContextType | null>(null);


export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    setMode(localStorage.getItem('theme') || mode)
    }, [mode]);
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <html lang="en" className={`${josefin_Sans.variable}`}>
      <Head>
         <link rel="icon" href="/favicon-32x32.png" type="image/x-icon" />
      </Head>
        <body
          className={`${
            mode === "dark" ? "bg-gray-700 text-gray-500 w-full h-full" : "bg-gray-100 text-gray-400 w-full h-full"
          } ${josefin_Sans.className}`}
        >
          {children}
        </body>
      </html>
    </ThemeContext.Provider>
  );
}
