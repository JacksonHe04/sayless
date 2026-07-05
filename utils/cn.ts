import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 类名合并工具函数
 * 用于合并和处理CSS类名，支持条件类名与 Tailwind 冲突覆盖
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}