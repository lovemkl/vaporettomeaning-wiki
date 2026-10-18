"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { AdBanner } from "./AdBanner";

/**
 * 顶部 Sticky 320×50 横幅（全设备）——课程实测收入主力（CPM $3.25，占全站约一半收入）。
 * - sticky top-20 滚动粘顶，曝光时长 30-60 秒（普通页内 banner 仅 3-8 秒）
 * - mx-auto max-w-4xl 限宽居中：桌面端 320 横幅两侧不出现横贯整屏的空白框
 * - ✕ 可手动关闭（dismissed 后本次浏览不再渲染；合规"广告可识别、可关闭"）
 * - key 为空不渲染
 */
export function DismissibleStickyBanner({ adKey }: { adKey?: string }) {
  const [dismissed, setDismissed] = useState(false);
  if (!adKey || adKey === "0" || dismissed) return null;

  return (
    <div className="sticky top-20 z-20 py-2">
      <div className="relative mx-auto max-w-4xl pr-10">
        <AdBanner type="320x50" adKey={adKey} />
        <button
          type="button"
          aria-label="关闭广告"
          onClick={() => setDismissed(true)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border bg-background/95 p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
