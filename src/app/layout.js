import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "3D PAST - Triển Lãm Ma Túy Thực Tế Ảo",
  description: "Trải nghiệm không gian triển lãm 3D tương tác sống động về nhận thức và phòng, chống tác hại của các chất ma túy. Hãy tham gia cuộc thi trắc nghiệm để kiểm tra kiến thức và nhận chứng chỉ danh giá.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
