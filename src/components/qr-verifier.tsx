"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
      // 摄像头可能尚未成功启动，忽略停止异常。
    }

    scannerRef.current.clear();

    scannerRef.current = null;
    setCameraActive(false);
  }, []);

  const verifyValue = useCallback(
    (value: string) => {
      const normalized = value.trim();
      if (!normalized) {
        setFeedback("请输入二维码内容后再验证。");
        return;
      }

      if (normalized === expectedValue) {
        setFeedback("验证成功，藏宝机关已解锁。");
        onVerified(normalized);
        return;
      }

      setFeedback("二维码内容不匹配，请重试。");
    },
    [expectedValue, onVerified]
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
          // 连续扫描时会频繁抛错，忽略单次解析失败。
        }
      );

      setCameraActive(true);
    } catch {
      setFeedback("无法打开摄像头，请改用手动输入二维码内容。");
      void stopCamera();
    }
  }, [containerId, stopCamera, verifyValue]);

  useEffect(() => {
    return () => {
      void stopCamera();
    };
  }, [stopCamera]);

  return (
    <section className="treasure-panel p-4">
      <h3 className="treasure-title text-lg text-[var(--ink-main)]">二维码互动</h3>
      <p className="mt-2 text-sm text-[var(--ink-muted)]">
        可选择调用摄像头扫码，也可手动输入二维码内容进行验证。
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {!cameraActive ? (
          <button
            type="button"
            onClick={startCamera}
            className="rounded-full border border-amber-500/40 bg-amber-500/20 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-500/30"
          >
            开始扫码
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void stopCamera()}
            className="rounded-full border border-amber-500/40 bg-amber-500/20 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-500/30"
          >
            停止扫码
          </button>
        )}
      </div>

      <div id={containerId} className="mt-3 min-h-10 overflow-hidden rounded-xl border border-[var(--border)] bg-black/20" />

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={manualInput}
          onChange={(event) => setManualInput(event.target.value)}
          placeholder="手动输入二维码内容"
          className="w-full rounded-xl border border-[var(--border)] bg-black/20 px-3 py-2 text-sm text-[var(--ink-main)] outline-none ring-0 placeholder:text-[var(--ink-muted)] focus:border-amber-400/70"
        />
        <button
          type="button"
          onClick={() => verifyValue(manualInput)}
          className="rounded-xl border border-[var(--border)] bg-black/25 px-4 py-2 text-sm text-[var(--ink-main)] transition hover:bg-black/35"
        >
          手动验证
        </button>
      </div>

      <p className="mt-2 text-xs text-[var(--ink-muted)]">演示测试码: {expectedValue}</p>
      {feedback ? <p className="mt-2 text-sm text-amber-100">{feedback}</p> : null}
    </section>
  );
}
