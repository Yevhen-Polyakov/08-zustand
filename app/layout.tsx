import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  subsets:["latin"],
  weight:["400", "700"],
  variable:"--font-roboto",
  display: "swap",
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub — your personal space for creating, organizing, and managing notes.",
  openGraph: {
    title: "NoteHub",
    description: "NoteHub — your personal space for creating, organizing, and managing notes.",
    url: process.env.NEXT_PUBLIC_APP_URL ?? `http://localhost:3000/`,
    images:[{
      url:"https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt:"NoteHub",
      }
    ],
    type:"article", 
}
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal:React.ReactNode;

}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
      <body>
        <TanStackProvider>
            <Header/>

            <main>
              {children}
              {modal}
            </main>
        
             <Footer/>
        </TanStackProvider>
       
        </body>
    </html>
  );
}
