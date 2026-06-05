"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "@/hooks/use-locale";
import { getTranslations } from "@/lib/translations";

type QrVerifierProps = {
  expectedValue: string;
  onVerified: (value: string) => void;
  levelNumber: number;
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

export function QrVerifier({ expectedValue, onVerified, levelNumber }: QrVerifierProps) {
  const locale = useLocale();
  const t = getTranslations(locale);
  const containerId = useMemo(() => `qr-scanner-level-${levelNumber}`, [levelNumber]);
  const scannerRef = useRef<Html5QrcodeInstance | null>(null);

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
      // 攝像頭可能尚未成功啟動，忽略停止異常。
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
    <section className="treasure-panel p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-1">
          <h3 className="treasure-title text-2xl text-[var(--ink-main)]">{t.qr.heading}</h3>
          <p className="treasure-title text-2xl text-[var(--ink-main)]">
            {t.qr.locationLabel} {levelNumber}
          </p>
        </div>
        {!cameraActive ? (
          <button
            type="button"
            onClick={startCamera}
            className="rounded-full border border-amber-500/40 bg-amber-500/20 px-3 py-1.5 text-xs text-amber-100 transition hover:bg-amber-500/30"
          >
            {t.qr.startScan}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void stopCamera()}
            className="rounded-full border border-amber-500/40 bg-amber-500/20 px-3 py-1.5 text-xs text-amber-100 transition hover:bg-amber-500/30"
          >
            {t.qr.stopScan}
          </button>
        )}
      </div>

      {cameraActive ? (
        <div
          id={containerId}
          className="mt-3 min-h-10 overflow-hidden rounded-xl border border-[var(--border)] bg-black/20"
        />
      ) : null}

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          value={manualInput}
          onChange={(event) => setManualInput(event.target.value)}
          placeholder={t.qr.manualPlaceholder}
          className="w-full rounded-xl border border-amber-500/50 bg-amber-500/10 px-3 py-2 text-sm text-[var(--ink-main)] outline-none ring-0 placeholder:text-amber-100/70 focus:border-amber-400/80"
        />
        <button
          type="button"
          onClick={() => verifyValue(manualInput)}
          className="rounded-xl border border-amber-500/50 bg-amber-500/20 px-3 py-2 text-sm text-amber-100 transition hover:bg-amber-500/30"
        >
          {t.qr.manualVerify}
        </button>
      </div>

      <p className="mt-2 text-xs text-[var(--ink-muted)]">
        {t.qr.demoCode}: {expectedValue}
      </p>

      {feedback ? <p className="mt-2 text-sm text-amber-100">{feedback}</p> : null}
    </section>
  );
}
