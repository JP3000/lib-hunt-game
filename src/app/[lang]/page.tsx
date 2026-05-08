import { redirect } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  redirect(`/${lang}/login`);
}
