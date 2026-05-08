"use client";

import { getLevels } from "@/data/levels";
import { useLocale } from "@/hooks/use-locale";
import { getTranslations } from "@/lib/translations";

type ItemPanelProps = {
  open: boolean;
  collectedItems: string[];
  onClose: () => void;
};

export function ItemPanel({ open, collectedItems, onClose }: ItemPanelProps) {
  if (!open) {
    return null;
  }

  const locale = useLocale();
  const t = getTranslations(locale);
  const items = getLevels(locale).map((level) => level.item);

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/70 px-3 py-4 sm:items-center">
      <div className="treasure-panel flex w-full max-w-3xl flex-col overflow-hidden p-4 max-h-[92vh] sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-muted)]">{t.items.panelSubtitle}</p>
            <h2 className="treasure-title mt-1 text-2xl">{t.items.panelTitle}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[var(--border)] bg-black/20 px-3 py-1 text-sm transition hover:bg-black/30"
          >
            {t.items.close}
          </button>
        </div>

        <div className="mt-4 grid min-h-0 flex-1 gap-3 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3 sm:pr-1">
          {items.map((item) => {
            const isCollected = collectedItems.includes(item.id);
            return (
              <div
                key={item.id}
                className={`rounded-xl border border-[var(--border)] bg-black/20 p-3 ${
                  isCollected ? "" : "opacity-45"
                }`}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg border border-[var(--border)] bg-black/30">
                  <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <p className="treasure-title mt-2 text-base">{item.name}</p>
                <p className="mt-1 text-xs text-[var(--ink-muted)]">
                  {isCollected ? item.description : t.items.locked}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
