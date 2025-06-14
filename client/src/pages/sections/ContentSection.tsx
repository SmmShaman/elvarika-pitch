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
      question: "Hva er 'Lydordbok i Lomma'?",
      answer:
        "'Lydordbok i Lomma' er en revolusjonerende text-til-tale applikasjon som lar deg bygge ditt personlige lydbibliotek fra enhver tekst. Med AI-stemmer som låter naturlige kan du lytte til artikler, dokumenter, e-post og annet innhold mens du er på farten.",
      defaultOpen: true,
    },
    {
      id: "item-2",
      question: "Hvem er målgruppen for denne teknologien?",
      answer: "Primært studenter, profesjonelle og personer med dysleksi eller synshemming. Også investorer som ser potensialet i det raskt voksende text-til-tale markedet som forventes å nå 75 milliarder dollar innen 2032.",
      defaultOpen: false,
    },
    {
      id: "item-3",
      question: "Hva gjør denne løsningen unik?",
      answer: "Vi kombinerer hyperrealistiske AI-stemmer med en intuitiv spilleliste-funksjon som gjør tekstkonvertering til en sømløs opplevelse. Brukere kan organisere sitt innhold som en personlig Spotify for tekst.",
      defaultOpen: false,
    },
    {
      id: "item-4",
      question: "Hva er investeringsmulighetene?",
      answer: "Med tre kraftige markedstrender - TTS-teknologi som vokser 30% årlig, over 1 milliard underserverte brukere med tilgjengelighetsbehov, og lydbokmarkedet som vokser 26.5% - posisjonerer vi oss i skjæringspunktet av flere milliard-dollar markeder.",
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
