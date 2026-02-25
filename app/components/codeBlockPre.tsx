"use client";

import { Check, Copy } from "lucide-react";
import React, { useRef, useState } from "react";

export function CodeBlockPre({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const codeChild = React.Children.toArray(children)[0] as React.ReactElement;
  const rawLang = (codeChild?.props?.className as string | undefined)?.replace(
    "language-",
    ""
  );
  const lang = rawLang || null;

  const handleCopy = async () => {
    const text = preRef.current?.querySelector("code")?.textContent ?? "";
    await navigator.clipboard.writeText(text.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper my-4 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-100 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-700">
        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
          {lang ?? ""}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
