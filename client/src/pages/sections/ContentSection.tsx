import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const ContentSection = (): JSX.Element => {
  // FAQ data for mapping
  const faqItems = [
    {
      id: "item-1",
      question: "Hva er elverika?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac scelerisque mauris. Sed vehicula orci ut nibh tempus,",
      defaultOpen: true,
    },
    {
      id: "item-2",
      question: "Lorem ipsum dolor sit alor",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      defaultOpen: false,
    },
    {
      id: "item-3",
      question: "Lorem ipsum dolor sit alor",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      defaultOpen: false,
    },
    {
      id: "item-4",
      question: "Lorem ipsum dolor sit alor",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      defaultOpen: false,
    },
  ];

  return (
    <section className="flex flex-col md:flex-row gap-16 w-full max-w-[1280px] mx-auto py-12">
      <div className="font-normal text-[#022f36] text-5xl tracking-[-1.44px] leading-[57.6px]">
        FAQs
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
