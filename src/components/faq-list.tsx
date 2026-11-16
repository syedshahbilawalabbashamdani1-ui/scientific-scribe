import { PiPlus } from "react-icons/pi";

import type { Faq } from "@/lib/services";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="border-t border-line">
      {faqs.map((faq, index) => (
        <details key={faq.question} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start gap-3 py-4 pr-1 [&::-webkit-details-marker]:hidden">
            <span className="mt-0.5 font-mono text-[9px] text-accent-text">
              0{index + 1}
            </span>
            <span className="flex-1 text-[14px] font-medium leading-snug">
              {faq.question}
            </span>
            <PiPlus
              className="mt-0.5 h-4 w-4 shrink-0 text-quiet transition-transform duration-200 group-open:rotate-45 group-open:text-accent-text"
              aria-hidden="true"
            />
          </summary>
          <div className="pb-4 pl-7 pr-8">
            <p className="max-w-[62ch] text-[12.5px] leading-relaxed text-quiet">
              {faq.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
