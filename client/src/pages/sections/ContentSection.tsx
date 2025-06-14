import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/hooks/useLanguage";

export const ContentSection = (): JSX.Element => {
  const { translations } = useLanguage();
  // FAQ data for mapping
  const faqItems = [
    {
      id: "item-1",
      question: translations.faq.items.what.question,
      answer: translations.faq.items.what.answer,
      defaultOpen: true,
    },
    {
      id: "item-2",
      question: translations.faq.items.audience.question,
      answer: translations.faq.items.audience.answer,
      defaultOpen: false,
    },
    {
      id: "item-3",
      question: translations.faq.items.unique.question,
      answer: translations.faq.items.unique.answer,
      defaultOpen: false,
    },
    {
      id: "item-4",
      question: translations.faq.items.investment.question,
      answer: translations.faq.items.investment.answer,
      defaultOpen: false,
    },
  ];

  return (
    <section className="flex flex-col md:flex-row gap-16 w-full max-w-[1280px] mx-auto py-12">
      <div className="font-normal text-[#022f36] text-5xl tracking-[-1.44px] leading-[57.6px]">
        {translations.faq.title}
      </div>

      <div className="flex-1 max-w-[858px]">
        <Accordion type="single" collapsible defaultValue="item-1">
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className={`mb-4 rounded-[20px] border border-solid ${
                item.id === "item-1"
                  ? "bg-[#defff0] border-[#022f36]"
                  : "border-white"
              }`}
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline">
                <span className="font-normal text-[#022f36] text-base tracking-[0] leading-[22.4px] text-left w-full">
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 pt-0">
                <div className="font-normal text-[#022f36] text-base tracking-[0] leading-[22.4px]">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
