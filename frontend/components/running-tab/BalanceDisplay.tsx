"use client";

import { cn } from "@/lib/utils";

interface BalanceDisplayProps {
  amount: number;
  className?: string;
}

export function formatVND(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function BalanceDisplay({ amount, className }: BalanceDisplayProps) {
  const isPositive = amount >= 0;

  return (
    <div className={cn("text-center py-6", className)}>
      <p
        className={cn(
          "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight",
          isPositive
            ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400"
            : "text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-500 to-pink-500"
        )}
      >
        {formatVND(amount)}
      </p>
    </div>
  );
}
