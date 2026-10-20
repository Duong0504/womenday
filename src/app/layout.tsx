import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10 🌸",
  description:
    "Gửi đến tất cả những người phụ nữ tuyệt vời nhất những lời chúc tốt đẹp và yêu thương nhất nhân ngày Phụ Nữ Việt Nam 20/10.",
  keywords: ["ngày phụ nữ", "20/10", "chúc mừng", "Việt Nam"],
  openGraph: {
    title: "Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10 🌸",
    description: "Gửi tặng những người phụ nữ tuyệt vời nhất những lời chúc yêu thương",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
