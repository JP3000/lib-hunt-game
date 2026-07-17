"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "@/hooks/use-locale";
import { getTranslations } from "@/lib/translations";

type QrVerifierProps = {
  expectedValue: string;
  onVerified: (value: string) => void;
  levelNumber: number;
  location?: string;
  locationNote?: string;
};

type Html5QrcodeInstance = {
  start: (
    cameraConfig: { facingMode: string },
    config: { fps: number; qrbox: { width: number; height: number } },
    onSuccess: (decodedText: string) => void,
    onError: (error: string) => void
  ) => Promise<unknown>;
  stop: () => Promise<unknown>;
  clear: () => void;
};

export function QrVerifier({ expectedValue, onVerified, levelNumber, location, locationNote }: QrVerifierProps) {
  const locale = useLocale();
  const t = getTranslations(locale);
  const containerId = useMemo(() => `qr-scanner-level-${levelNumber}`, [levelNumber]);
  const scannerRef = useRef<Html5QrcodeInstance | null>(null);

  const [expanded, setExpanded] = useState(false);
  const [verified, setVerified] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [feedback, setFeedback] = useState("");

  const stopCamera = useCallback(async () => {
    if (!scannerRef.current) {
      return;
    }

    try {
      await scannerRef.current.stop();
    } catch {
      // 攝影鏡頭可能尚未成功啟動，忽略停止異常。
    }

    scannerRef.current.clear();

    scannerRef.current = null;
    setCameraActive(false);
  }, []);

  const verifyValue = useCallback(
    (value: string) => {
      const normalized = value.trim();
      if (!normalized) {
        setFeedback(t.qr.emptyValue);
        return;
      }

      if (normalized === expectedValue) {
        setFeedback(t.qr.success);
        setVerified(true);
        setExpanded(false);
        onVerified(normalized);
        return;
      }

      setFeedback(t.qr.mismatch);
    },
    [expectedValue, onVerified, t]
  );

  const startCamera = useCallback(async () => {
    setFeedback("");

    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      const scanner = new Html5Qrcode(containerId) as unknown as Html5QrcodeInstance;
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (decodedText) => {
          setManualInput(decodedText);
          verifyValue(decodedText);
          void stopCamera();
        },
        () => {
          // 連續掃描時會頻繁拋錯，忽略單次解析失敗。
        }
      );

      setCameraActive(true);
    } catch {
      setFeedback(t.qr.cameraError);
      void stopCamera();
    }
  }, [containerId, stopCamera, verifyValue, t]);

  useEffect(() => {
    return () => {
      void stopCamera();
    };
  }, [stopCamera]);

  return (
    <section className="treasure-panel overflow-hidden p-0">
      {/* 摺疊狀態 */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 border-b border-[var(--border)] px-5 py-3.5 text-left transition hover:bg-white/5"
      >
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          verified ? "bg-green-500/20" : "bg-amber-500/15"
        }`}>
          {verified ? (
            <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <circle cx="12" cy="13" r="3" strokeLinecap="round" />
            </svg>
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-medium ${verified ? "text-green-400" : "text-amber-300"}`}>
            {verified ? t.qr.success : t.qr.heading}
          </p>
          <p className="mt-0.5 truncate text-sm font-medium text-[var(--ink-main)]">
            {location ?? `${t.qr.locationLabel} ${levelNumber}`}
          </p>
        </div>
        <svg className={`h-4 w-4 shrink-0 text-[var(--ink-muted)] transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 展開內容 */}
      {expanded && (
        <>
          {/* 標題區 */}
          <div className="space-y-1 border-b border-[var(--border)] px-5 py-4">
            <h3 className="text-sm font-medium tracking-wide text-amber-300">{t.qr.heading}</h3>
            <p className="text-lg font-semibold text-[var(--ink-main)]">
              {location ?? `${t.qr.locationLabel} ${levelNumber}`}
            </p>
            {locationNote ? (
              <p className="text-xs text-[var(--ink-muted)]">{locationNote}</p>
            ) : null}
          </div>

          {/* 掃碼區域 */}
          <div className="relative mx-5 mt-4 overflow-hidden rounded-2xl bg-black/40">
            <div className={`absolute inset-3 z-10 rounded-2xl border-2 transition-all duration-300 pointer-events-none ${
              cameraActive ? "border-amber-400/50 shadow-[0_0_30px_rgba(251,191,36,0.15)]" : "border-white/10"
            }`}>
              <span className="absolute -left-[2px] -top-[2px] h-5 w-5 rounded-br-lg border-l-2 border-t-2 border-amber-400/70" />
              <span className="absolute -right-[2px] -top-[2px] h-5 w-5 rounded-bl-lg border-r-2 border-t-2 border-amber-400/70" />
              <span className="absolute -bottom-[2px] -left-[2px] h-5 w-5 rounded-tr-lg border-b-2 border-l-2 border-amber-400/70" />
              <span className="absolute -bottom-[2px] -right-[2px] h-5 w-5 rounded-tl-lg border-b-2 border-r-2 border-amber-400/70" />
            </div>

            <div id={containerId} className="aspect-square w-full" />

            {!cameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <svg className="h-10 w-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <circle cx="12" cy="13" r="3" strokeLinecap="round" />
                </svg>
                <p className="text-xs text-white/30">{t.qr.scanArea}</p>
              </div>
            )}
          </div>

          {/* 掃碼按鈕 */}
          <div className="mx-5 mt-3">
            {!cameraActive ? (
              <button
                type="button"
                onClick={startCamera}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/15 py-2.5 text-sm font-medium text-amber-100 transition hover:bg-amber-500/25 active:scale-[0.98]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <circle cx="12" cy="13" r="3" strokeLinecap="round" />
                </svg>
                {t.qr.startScan}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void stopCamera()}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-500/20 active:scale-[0.98]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                </svg>
                {t.qr.stopScan}
              </button>
            )}
          </div>

          {/* 手動輸入區 */}
          <div className="mx-5 mb-4 mt-4 border-t border-[var(--border)] pt-3">
            <p className="mb-2 text-xs text-[var(--ink-muted)]">{t.qr.manualPlaceholder}</p>
            <div className="flex gap-2">
              <input
                value={manualInput}
                onChange={(event) => setManualInput(event.target.value)}
                onKeyDown={(e) => e.key === "Enter" && verifyValue(manualInput)}
                placeholder={t.qr.manualPlaceholder}
                className="flex-1 rounded-xl border border-[var(--border)] bg-black/20 px-3.5 py-2.5 text-sm text-[var(--ink-main)] outline-none ring-0 placeholder:text-[var(--ink-muted)] focus:border-amber-400/60"
              />
              <button
                type="button"
                onClick={() => verifyValue(manualInput)}
                className="shrink-0 rounded-xl bg-amber-500/20 px-5 py-2.5 text-sm font-medium text-amber-100 transition hover:bg-amber-500/30 active:scale-[0.98]"
              >
                {t.qr.manualVerify}
              </button>
            </div>
          </div>

          {/* 反饋訊息 */}
          {feedback ? (
            <div className={`mx-5 mb-4 rounded-lg border px-3.5 py-2.5 text-sm font-medium ${
              feedback === t.qr.success
                ? "border-green-500/30 bg-green-500/10 text-green-400"
                : feedback === t.qr.mismatch
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : "border-amber-500/30 bg-amber-500/10 text-amber-100"
            }`}>
              {feedback}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
