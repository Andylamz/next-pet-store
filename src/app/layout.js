import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import DarkModeSwitch from "@/components/DarkModeSwitch";

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
  icons: {
    icon: "/Andy_favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={` ${poppins.className} bg-white text-black dark:bg-[#272727] dark:text-white min-h-screen transition-colors duration-400`}
        >
          <ThemeProvider attribute="class" defaultTheme="system">
            <div className="flex flex-col">
              <ToastContainer />
              <Header />
              {/* xl:px-35 md:px-10 px-4 */}
              <div className="min-h-screen flex-1">
                <div className="flex group fixed right-7 bottom-4 w-10 h-10 bg-gray-700 justify-center items-center border border-gray-400 rounded-full text-white overflow-hidden dark:bg-black hover:bg-gray-800 transition-colors duration-300 z-999">
                  <DarkModeSwitch />
                </div>
                <div className="min-h-screen">{children}</div>
                <Footer />
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
