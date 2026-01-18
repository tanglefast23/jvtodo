"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { icon: 28, text: "text-xl" },
  md: { icon: 38, text: "text-3xl" },
  lg: { icon: 48, text: "text-4xl" },
};

/** Thanh Khong To Do logo - minimalist notebook icon */
export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const { icon, text } = sizes[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="notebookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>

        {/* Notebook body */}
        <rect
          x="8"
          y="4"
          width="26"
          height="32"
          rx="4"
          fill="url(#notebookGradient)"
        />

        {/* Notebook binding/spine */}
        <rect
          x="4"
          y="8"
          width="4"
          height="6"
          rx="1"
          fill="white"
          fillOpacity="0.9"
        />
        <rect
          x="4"
          y="17"
          width="4"
          height="6"
          rx="1"
          fill="white"
          fillOpacity="0.9"
        />
        <rect
          x="4"
          y="26"
          width="4"
          height="6"
          rx="1"
          fill="white"
          fillOpacity="0.9"
        />

        {/* Notebook lines */}
        <line x1="14" y1="12" x2="28" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1="14" y1="18" x2="28" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1="14" y1="24" x2="24" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
      </svg>

      {showText && (
        <span
          className={cn(
            "whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400",
            text
          )}
          style={{
            fontWeight: 900,
            letterSpacing: "-0.02em",
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          }}
        >
          Thanh To Do
        </span>
      )}
    </div>
  );
}
