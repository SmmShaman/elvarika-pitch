import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { X, Calendar, Clock, User } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

interface BlogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Blog: React.FC<BlogProps> = ({ isOpen, onClose }) => {
  const { translations, language } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const blogPosts: Record<string, BlogPost[]> = {
    no: [
      {
        id: "1",
        title: "Hvorfor Text-to-Speech er fremtidens investering",
        excerpt: "TTS-markedet vokser med 15% årlig og forventes å nå 75 milliarder dollar innen 2032.",
        content: `
          <h2>Text-to-Speech: En revolusjon i digital tilgjengelighet</h2>
          <p>Text-to-Speech (TTS) teknologi har utviklet seg fra enkle robotstemmer til hyperrealistiske AI-stemmer som er nesten umulige å skille fra menneskelige stemmer.</p>
          
          <h3>Markedsvekst og muligheter</h3>
          <p>Det globale TTS-markedet er verdsatt til 22 milliarder dollar i 2024 og forventes å vokse med en sammensatt årlig vekstrate (CAGR) på 15.2% frem til 2032.</p>
          
          <h3>Hovedfaktorer som driver vekst:</h3>
          <ul>
            <li>Økt fokus på digital tilgjengelighet</li>
            <li>Vekst i lydbokindustrien</li>
            <li>AI-fremskritt som muliggjør naturlige stemmer</li>
            <li>Mobil-først tilnærming til innholdskonsum</li>
          </ul>
          
          <h3>Elvarika sin unike posisjon</h3>
          <p>Vår løsning kombinerer den nyeste AI-teknologien med brukeropplevelse som prioriterer enkelthet og personalisering. Ved å fokusere på det norske markedet først, kan vi etablere en sterk posisjon før vi ekspanderer globalt.</p>
        `,
        author: "Elvarika Team",
        date: "15. juni 2025",
        readTime: "5 min",
        category: "Marked"
      },
      {
        id: "2",
        title: "AI-stemmer: Fra robot til hyperrealistisk",
        excerpt: "Hvordan moderne AI har revolusjonert kvaliteten på syntetiske stemmer.",
        content: `
          <h2>Utviklingen av AI-stemmer</h2>
          <p>De siste årene har vi sett en dramatisk forbedring i kvaliteten på AI-genererte stemmer. Fra de første robotaktige stemmene til dagens hyperrealistiske stemmer som kan formidle følelser og nyanser.</p>
          
          <h3>Teknologiske gjennombrudd</h3>
          <p>Moderne neural network-baserte TTS-systemer bruker deep learning for å analysere millioner av timer med menneskelig tale og lære seg å reprodusere naturlige talepattern.</p>
          
          <h3>Kvalitetsfaktorer</h3>
          <ul>
            <li>Naturlig prosodi og rytme</li>
            <li>Korrekt uttale av norske ord</li>
            <li>Emosjonell nyansering</li>
            <li>Kontekstuell forståelse</li>
          </ul>
          
          <h3>Fremtiden for AI-stemmer</h3>
          <p>Vi forventer at AI-stemmer vil bli så realistiske at de blir foretrukket fremfor opptak i mange sammenhenger på grunn av deres fleksibilitet og konsistens.</p>
        `,
        author: "Teknisk Team",
        date: "12. juni 2025",
        readTime: "4 min",
        category: "Teknologi"
      },
      {
        id: "3",
        title: "Tilgjengelighet i det digitale Norge",
        excerpt: "Hvorfor universell design er både etisk riktig og forretningsmessig smart.",
        content: `
          <h2>Digital tilgjengelighet i Norge</h2>
          <p>Norge har som mål å være et av verdens mest tilgjengelige samfunn. Dette gjelder også i den digitale sfæren, hvor Text-to-Speech teknologi spiller en kritisk rolle.</p>
          
          <h3>Statistikk som beveger</h3>
          <p>I Norge lever omtrent 800 000 personer med ulike former for funksjonsnedsettelser. Av disse har mange nytte av TTS-teknologi i hverdagen.</p>
          
          <h3>Lovverk og krav</h3>
          <ul>
            <li>WCAG 2.1 AA-standarden</li>
            <li>EUs tilgjengelighetslov</li>
            <li>Norsk anti-diskrimineringslovgivning</li>
          </ul>
          
          <h3>Forretningsmuligheter</h3>
          <p>Bedrifter som prioriterer tilgjengelighet når ikke bare ut til flere kunder, men posisjonerer seg også som samfunnsansvarlige aktører.</p>
        `,
        author: "Samfunnsansvar Team",
        date: "10. juni 2025",
        readTime: "6 min",
        category: "Samfunn"
      }
    ],
    en: [
      {
        id: "1",
        title: "Why Text-to-Speech is the Future Investment",
        excerpt: "The TTS market is growing 15% annually and expected to reach $75 billion by 2032.",
        content: `
          <h2>Text-to-Speech: A Revolution in Digital Accessibility</h2>
          <p>Text-to-Speech (TTS) technology has evolved from simple robotic voices to hyperrealistic AI voices that are almost indistinguishable from human speech.</p>
          
          <h3>Market Growth and Opportunities</h3>
          <p>The global TTS market is valued at $22 billion in 2024 and expected to grow at a compound annual growth rate (CAGR) of 15.2% through 2032.</p>
          
          <h3>Key factors driving growth:</h3>
          <ul>
            <li>Increased focus on digital accessibility</li>
            <li>Growth in audiobook industry</li>
            <li>AI advances enabling natural voices</li>
            <li>Mobile-first approach to content consumption</li>
          </ul>
          
          <h3>Elvarika's Unique Position</h3>
          <p>Our solution combines cutting-edge AI technology with user experience that prioritizes simplicity and personalization. By focusing on the Norwegian market first, we can establish a strong position before expanding globally.</p>
        `,
        author: "Elvarika Team",
        date: "June 15, 2025",
        readTime: "5 min",
        category: "Market"
      },
      {
        id: "2",
        title: "AI Voices: From Robot to Hyperrealistic",
        excerpt: "How modern AI has revolutionized the quality of synthetic voices.",
        content: `
          <h2>The Evolution of AI Voices</h2>
          <p>Recent years have seen dramatic improvements in AI-generated voice quality. From early robotic voices to today's hyperrealistic voices that can convey emotions and nuances.</p>
          
          <h3>Technological Breakthroughs</h3>
          <p>Modern neural network-based TTS systems use deep learning to analyze millions of hours of human speech and learn to reproduce natural speech patterns.</p>
          
          <h3>Quality Factors</h3>
          <ul>
            <li>Natural prosody and rhythm</li>
            <li>Correct pronunciation of Norwegian words</li>
            <li>Emotional nuancing</li>
            <li>Contextual understanding</li>
          </ul>
          
          <h3>The Future of AI Voices</h3>
          <p>We expect AI voices to become so realistic that they'll be preferred over recordings in many contexts due to their flexibility and consistency.</p>
        `,
        author: "Technical Team",
        date: "June 12, 2025",
        readTime: "4 min",
        category: "Technology"
      },
      {
        id: "3",
        title: "Accessibility in Digital Norway",
        excerpt: "Why universal design is both ethically right and business smart.",
        content: `
          <h2>Digital Accessibility in Norway</h2>
          <p>Norway aims to be one of the world's most accessible societies. This also applies to the digital sphere, where Text-to-Speech technology plays a critical role.</p>
          
          <h3>Moving Statistics</h3>
          <p>In Norway, approximately 800,000 people live with various forms of disabilities. Many of these benefit from TTS technology in their daily lives.</p>
          
          <h3>Legislation and Requirements</h3>
          <ul>
            <li>WCAG 2.1 AA standard</li>
            <li>EU's accessibility law</li>
            <li>Norwegian anti-discrimination legislation</li>
          </ul>
          
          <h3>Business Opportunities</h3>
          <p>Companies that prioritize accessibility not only reach more customers but also position themselves as socially responsible actors.</p>
        `,
        author: "Social Responsibility Team",
        date: "June 10, 2025",
        readTime: "6 min",
        category: "Society"
      }
    ],
    uk: [
      {
        id: "1",
        title: "Чому Text-to-Speech - це інвестиція майбутнього",
        excerpt: "Ринок TTS зростає на 15% щорічно і очікується досягти $75 млрд до 2032 року.",
        content: `
          <h2>Text-to-Speech: Революція в цифровій доступності</h2>
          <p>Технологія Text-to-Speech (TTS) еволюціонувала від простих роботизованих голосів до гіперреалістичних AI-голосів, які майже неможливо відрізнити від людського мовлення.</p>
          
          <h3>Зростання ринку та можливості</h3>
          <p>Глобальний ринок TTS оцінюється в $22 млрд у 2024 році і очікується зростання з річним темпом 15.2% до 2032 року.</p>
          
          <h3>Ключові фактори зростання:</h3>
          <ul>
            <li>Підвищена увага до цифрової доступності</li>
            <li>Зростання індустрії аудіокниг</li>
            <li>Прогрес AI, що дозволяє природні голоси</li>
            <li>Мобільний підхід до споживання контенту</li>
          </ul>
          
          <h3>Унікальна позиція Elvarika</h3>
          <p>Наше рішення поєднує найсучаснішу AI технологію з користувацьким досвідом, що пріоритизує простоту та персоналізацію. Фокусуючись спочатку на норвезькому ринку, ми можемо встановити сильну позицію перед глобальною експансією.</p>
        `,
        author: "Команда Elvarika",
        date: "15 червня 2025",
        readTime: "5 хв",
        category: "Ринок"
      },
      {
        id: "2",
        title: "AI-голоси: Від робота до гіперреалістичності",
        excerpt: "Як сучасний AI революціонізував якість синтетичних голосів.",
        content: `
          <h2>Еволюція AI-голосів</h2>
          <p>Останні роки показали драматичне покращення якості AI-генерованих голосів. Від ранніх роботизованих голосів до сьогоднішніх гіперреалістичних голосів, що можуть передавати емоції та нюанси.</p>
          
          <h3>Технологічні прориви</h3>
          <p>Сучасні нейромережеві TTS-системи використовують глибоке навчання для аналізу мільйонів годин людського мовлення та вивчення відтворення природних мовленнєвих патернів.</p>
          
          <h3>Фактори якості</h3>
          <ul>
            <li>Природна просодія та ритм</li>
            <li>Правильна вимова норвезьких слів</li>
            <li>Емоційне нюансування</li>
            <li>Контекстуальне розуміння</li>
          </ul>
          
          <h3>Майбутнє AI-голосів</h3>
          <p>Ми очікуємо, що AI-голоси стануть настільки реалістичними, що їм віддаватимуть перевагу над записами в багатьох контекстах через їх гнучкість та послідовність.</p>
        `,
        author: "Технічна команда",
        date: "12 червня 2025",
        readTime: "4 хв",
        category: "Технології"
      },
      {
        id: "3",
        title: "Доступність у цифровій Норвегії",
        excerpt: "Чому універсальний дизайн є як етично правильним, так і бізнес-розумним.",
        content: `
          <h2>Цифрова доступність у Норвегії</h2>
          <p>Норвегія прагне стати одним з найдоступніших суспільств у світі. Це також стосується цифрової сфери, де технологія Text-to-Speech відіграє критичну роль.</p>
          
          <h3>Вражаюча статистика</h3>
          <p>У Норвегії приблизно 800 000 людей живуть з різними формами інвалідності. Багато з них мають користь від TTS-технології у повсякденному житті.</p>
          
          <h3>Законодавство та вимоги</h3>
          <ul>
            <li>Стандарт WCAG 2.1 AA</li>
            <li>Закон про доступність ЄС</li>
            <li>Норвезьке антидискримінаційне законодавство</li>
          </ul>
          
          <h3>Бізнес-можливості</h3>
          <p>Компанії, що пріоритизують доступність, не лише досягають більше клієнтів, але й позиціонують себе як соціально відповідальні актори.</p>
        `,
        author: "Команда соціальної відповідальності",
        date: "10 червня 2025",
        readTime: "6 хв",
        category: "Суспільство"
      }
    ]
  };

  const currentPosts = blogPosts[language] || blogPosts.no;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#022f36] to-[#033944]">
          <h1 className="text-2xl font-bold text-white">
            {language === 'no' ? 'Blogg' : language === 'en' ? 'Blog' : 'Блог'}
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex h-[calc(100%-80px)]">
          {/* Sidebar with blog posts list */}
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-4 text-[#022f36]">
                {language === 'no' ? 'Artikler' : language === 'en' ? 'Articles' : 'Статті'}
              </h2>
              <div className="space-y-3">
                {currentPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedPost?.id === post.id
                        ? 'bg-[#defff0] border-l-4 border-[#022f36]'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <h3 className="font-medium text-[#022f36] mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 overflow-y-auto">
            {selectedPost ? (
              <div className="p-8">
                <div className="max-w-3xl mx-auto">
                  <div className="mb-6">
                    <span className="inline-block bg-[#defff0] text-[#022f36] px-3 py-1 rounded-full text-sm font-medium mb-4">
                      {selectedPost.category}
                    </span>
                    <h1 className="text-3xl font-bold text-[#022f36] mb-4">
                      {selectedPost.title}
                    </h1>
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {selectedPost.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {selectedPost.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {selectedPost.readTime}
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-[#022f36] prose-a:text-[#022f36] prose-strong:text-[#022f36]"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <h3 className="text-lg font-medium mb-2">
                    {language === 'no' ? 'Velg en artikkel' : language === 'en' ? 'Select an article' : 'Виберіть статтю'}
                  </h3>
                  <p>
                    {language === 'no' 
                      ? 'Klikk på en artikkel fra listen til venstre for å lese den.'
                      : language === 'en'
                      ? 'Click on an article from the list on the left to read it.'
                      : 'Натисніть на статтю зі списку ліворуч, щоб прочитати її.'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};