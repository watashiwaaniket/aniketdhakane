"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const DEFAULT_PROMPT = "Why might Aniket Dhakane (aniketdhakane.xyz) matter?";
const DEFAULT_LABEL = "Ask why Aniket might matter on any platform";

type Platform = {
  name: string;
  href: string;
  icon: ReactNode;
};

function platformsFor(prompt: string): Platform[] {
  const encodedPrompt = encodeURIComponent(prompt);
  return [
    {
      name: "ChatGPT",
      href: `https://chatgpt.com/?q=${encodedPrompt}`,
      icon: <ChatGPTIcon />,
    },
    {
      name: "Claude",
      href: `https://claude.ai/new?q=${encodedPrompt}`,
      icon: <ClaudeIcon />,
    },
    {
      name: "Grok",
      href: `https://grok.com/?q=${encodedPrompt}`,
      icon: <GrokIcon />,
    },
    {
      name: "Perplexity",
      href: `https://www.perplexity.ai/search?q=${encodedPrompt}`,
      icon: <PerplexityIcon />,
    },
    {
      name: "Gemini",
      href: `https://gemini.google.com/app?q=${encodedPrompt}`,
      icon: <GeminiIcon />,
    },
  ];
}

const iconClass = "h-[18px] w-[18px]";

function ChatGPTIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={iconClass}
      aria-hidden
    >
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.142-.08 4.778-2.759a.795.795 0 0 0 .393-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.453 8.697a4.507 4.507 0 0 1 2.37-1.973V11.6a.766.766 0 0 0 .388.676l5.814 3.355-2.02 1.168a.076.076 0 0 1-.071.006L6.163 14.07a4.504 4.504 0 0 1-3.71-5.373zm16.498 3.855L13.104 8.364 15.12 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.104v-5.677a.79.79 0 0 0-.394-.666zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zM8.307 12.863l-2.02-1.164a.08.08 0 0 1-.038-.057V6.074a4.5 4.5 0 0 1 7.376-3.454l-.142.08L8.704 5.459a.795.795 0 0 0-.393.681zm1.098-2.365 2.602-1.5 2.607 1.5v3l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

function ClaudeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={iconClass}
      aria-hidden
    >
      <rect x="10.85" y="2.2" width="2.3" height="19.6" rx="1.15" />
      <rect x="2.2" y="10.85" width="19.6" height="2.3" rx="1.15" />
      <rect
        x="10.85"
        y="2.2"
        width="2.3"
        height="19.6"
        rx="1.15"
        transform="rotate(45 12 12)"
      />
      <rect
        x="10.85"
        y="2.2"
        width="2.3"
        height="19.6"
        rx="1.15"
        transform="rotate(-45 12 12)"
      />
    </svg>
  );
}

function GrokIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      fillRule="evenodd"
      className={iconClass}
      aria-hidden
    >
      <path d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815" />
    </svg>
  );
}

function PerplexityIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={iconClass}
      aria-hidden
    >
      <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z" />
    </svg>
  );
}

function GeminiIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={iconClass}
      aria-hidden
    >
      <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
    </svg>
  );
}

export default function AskAI({
  label = DEFAULT_LABEL,
  prompt = DEFAULT_PROMPT,
  className = "my-6",
}: {
  label?: string;
  prompt?: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const platforms = platformsFor(prompt);

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm text-[var(--text-muted)] text-pretty">{label}</p>

        <div className="flex shrink-0 items-center gap-2 overflow-visible px-1 py-1">
          {platforms.map((platform) => (
            <m.a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ask ${platform.name}: ${prompt}`}
              title={`Ask ${platform.name}`}
              className="inline-flex size-10 origin-center items-center justify-center rounded-xl bg-white text-[#1f2a2f] shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)] transition-[box-shadow] duration-150 ease-out hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.12 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              {platform.icon}
            </m.a>
          ))}
        </div>
      </div>
    </div>
  );
}
