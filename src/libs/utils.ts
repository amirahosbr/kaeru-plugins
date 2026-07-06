/**
 * Utility helpers shared across the app.
 *
 * `cn` merges class names: `clsx` resolves conditionals, then `tailwind-merge`
 * dedupes conflicting Tailwind utilities (last one wins). Use it everywhere
 * class strings are composed so variant/override order stays predictable.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
