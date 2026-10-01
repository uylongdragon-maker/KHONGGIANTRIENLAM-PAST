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
  title: "Triển Lãm Ma Túy Thực Tế Ảo 3D - Công An Phường Tân Hưng & Phòng Cảnh Sát Điều Tra Tội Phạm Về Ma Túy",
  description: "Trải nghiệm không gian triển lãm 3D tương tác sống động về nhận thức và phòng, chống tác hại của các chất ma túy do Công An phường Tân Hưng phối hợp cùng Phòng Cảnh sát điều tra tội phạm về ma túy tổ chức.",
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
