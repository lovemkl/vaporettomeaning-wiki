"use client";

import { useMemo } from "react";

// Adsterra Banner 广告位尺寸表（小白班第七课 3.1）
const SIZES: Record<string, { w: number; h: number }> = {
  "320x50": { w: 320, h: 50 },
  "300x250": { w: 300, h: 250 },
  "728x90": { w: 728, h: 90 },
  "468x60": { w: 468, h: 60 },
  "160x600": { w: 160, h: 600 },
  "160x300": { w: 160, h: 300 },
};

export type BannerType = keyof typeof SIZES;

/**
 * Adsterra Banner/Sidebar 广告位（iframe srcDoc 隔离方案，小白班第七课 4.2）。
 * - 每个 iframe 是独立 window，atOptions 各用各的，多广告同页不串号
 * - key 为空或 "0" 时不渲染（新站前 1-2 天无广告 / 关闭某广告位只需清空 env）
 * - 尺寸锁死在 iframe 内，广告再大也不破版
 */
export function AdBanner({ type, adKey, className }: { type: BannerType; adKey?: string; className?: string }) {
  const size = SIZES[type];
  const srcDoc = useMemo(() => {
    if (!adKey || adKey === "0" || !size) return "";
    return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;display:flex;justify-content:center;align-items:center;overflow:hidden;">
<script type="text/javascript">
  atOptions = { 'key': '${adKey}', 'format': 'iframe', 'height': ${size.h}, 'width': ${size.w}, 'params': {} };
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/${adKey}/invoke.js"></script>
</body></html>`;
  }, [adKey, size]);

  if (!adKey || adKey === "0" || !size) return null;

  return (
    <div className={`flex justify-center ${className ?? ""}`} aria-label="advertisement">
      <iframe
        title={`ad-${type}`}
        srcDoc={srcDoc}
        width={size.w}
        height={size.h}
        scrolling="no"
        style={{ border: "none", display: "block" }}
      />
    </div>
  );
}
