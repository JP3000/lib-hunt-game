"use client";

import Link from "next/link";
import { useLocale } from "@/hooks/use-locale";
import { getTranslations } from "@/lib/translations";
import { withLocalePrefix } from "@/lib/i18n";

export function IntroScreen() {
  const locale = useLocale();
  const t = getTranslations(locale);

  return (
    <main className="intro-shell">
      <video
        className="intro-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/assets/intro.mp4" type="video/mp4" />
      </video>
      <div className="intro-video-overlay" aria-hidden="true" />
      <div className="intro-glow" aria-hidden="true" />
      <div className="intro-orbit" aria-hidden="true" />

      <section className="intro-card">
        <p className="intro-eyebrow">{t.intro.eyebrow}</p>
        <h1 className="intro-title">{t.intro.headline}</h1>
        <p className="intro-subtitle">{t.intro.subtitle}</p>
        <div className="intro-actions">
          <Link className="intro-cta" href={withLocalePrefix("/login", locale)}>
            {t.intro.start}
          </Link>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 text-center">
          <p className="text-xs text-white/50">{t.footer.producer}</p>
          <p className="mt-1 text-[0.65rem] text-white/40">{t.footer.disclaimer}</p>
        </div>
      </section>

      <div className="intro-spark intro-spark-a" aria-hidden="true" />
      <div className="intro-spark intro-spark-b" aria-hidden="true" />
      <div className="intro-spark intro-spark-c" aria-hidden="true" />
    </main>
  );
}
