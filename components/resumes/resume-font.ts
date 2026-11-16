import type { ResumeFontConfig } from "@/types";

// 字体栈按「先拉丁、后中文」排列：浏览器逐字形回退，拉丁字体不含中文，
// 中文会自然落到后面的中文字体；两段都不带通用族，避免中文被 generic
// 字体提前截获，最终通用族只作为兜底。
const LATIN_SANS = '"Geist", "Geist Fallback", ui-sans-serif, system-ui';
const LATIN_SERIF = 'Georgia, "Times New Roman", "Nimbus Roman"';
const CJK_SANS =
  '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC"';
const CJK_SERIF =
  '"Songti SC", "STSong", SimSun, "Noto Serif CJK SC", "Source Han Serif SC"';

export function resumeFontFamily(
  font: Partial<ResumeFontConfig> | undefined,
): string {
  const chineseSerif = font?.chineseSerif ?? false;
  const latinSerif = font?.latinSerif ?? false;
  return [
    latinSerif ? LATIN_SERIF : LATIN_SANS,
    chineseSerif ? CJK_SERIF : CJK_SANS,
    chineseSerif ? "serif" : "sans-serif",
  ].join(", ");
}
