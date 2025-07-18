import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import DarkModeSwitch from "@/components/DarkModeSwitch";
import Header from "@/components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pet Store | Andy Lam",
  description:
    "This is a full stack pet store application made by Andy (Yan Ting) to improve Next.js skills and knowledge",
  images: {
    image: "/Andy_favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${poppins.className} bg-white text-black dark:bg-black dark:text-white min-h-screen transition-colors duration-400`}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="flex flex-col">
            <Header />
            <div className="xl:px-35 md:px-10 px-4 min-h-screen flex-1">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
