import type { ReactNode } from "react";
import "@/app/globals.css";

export const metadata = {
  title: "管理端 · 圖書館尋寶遊戲",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="bg-[#0d0d0c] text-[var(--ink-base)] antialiased">
        {children}
      </body>
    </html>
  );
}
