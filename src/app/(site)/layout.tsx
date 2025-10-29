import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-surface text-ink overflow-x-hidden">
      <SiteHeader />
      <main className="flex-1 pt-[92px] sm:pt-[108px] lg:pt-[120px]">{children}</main>
      <SiteFooter />
    </div>
  );
}
