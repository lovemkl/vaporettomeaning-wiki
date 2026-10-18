"use client";

import { AdBanner } from "./AdBanner";

/**
 * 桌面端 Fixed 侧边栏广告（小白班第七课 4.3）——第二大收入块（与 728×90 合计约三成收入）。
 * - 左 160×600 摩天大楼 + 右 160×300 半高竖幅，视觉平衡
 * - fixed 定位贴内容区两侧空白，滚动时始终可见（曝光 20-40 秒）
 * - hidden xl:block 只在 ≥1280px 大屏显示（只有大屏才有足够空白）
 * - calc 定位贴住 896px 内容宽（max-w-7xl 主栏网格的实际内容带）外沿
 */
export function SidebarAds({ leftKey, rightKey }: { leftKey?: string; rightKey?: string }) {
  const left = leftKey && leftKey !== "0" ? leftKey : "";
  const right = rightKey && rightKey !== "0" ? rightKey : "";
  if (!left && !right) return null;

  return (
    <>
      {left && (
        <aside
          className="fixed top-24 z-10 hidden xl:block"
          style={{ left: "calc((100vw - 900px) / 2 - 190px)" }}
          aria-label="advertisement-left"
        >
          <AdBanner type="160x600" adKey={left} />
        </aside>
      )}
      {right && (
        <aside
          className="fixed top-24 z-10 hidden xl:block"
          style={{ right: "calc((100vw - 900px) / 2 - 190px)" }}
          aria-label="advertisement-right"
        >
          <AdBanner type="160x300" adKey={right} />
        </aside>
      )}
    </>
  );
}
