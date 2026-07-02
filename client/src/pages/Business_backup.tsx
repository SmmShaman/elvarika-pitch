import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';

import { LanguageSwitcher } from './components/LanguageSwitcher';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Upload, 
  Brain, 
  Headphones,
  Target,
  Repeat,
  Eye,
  BarChart3,
  Truck,
  HardHat,
  Coffee,
  Tractor
} from 'lucide-react';
import { CompactAnimatedDemo } from './components/CompactAnimatedDemo';
import { FullScreenScrolling } from './components/FullScreenScrolling';
import { DemoAccessForm } from './components/DemoAccessForm';

interface BusinessTranslations {
  nav: {
    demo: string;
    pricing: string;
    useCase: string;
    about: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  problems: {
    title: string;
    safety: {
      title: string;
      description: string;
    };
    productivity: {
      title: string;
      description: string;
    };
    costs: {
      title: string;
      description: string;
    };
    sales: {
      title: string;
      description: string;
    };
  };
  solution: {
    title: string;
    step1: {
      title: string;
      description: string;
    };
    step2: {
      title: string;
      description: string;
    };
    step3: {
      title: string;
      description: string;
    };
  };
  features: {
    title: string;
    anchor: {
      title: string;
      description: string;
    };
    srs: {
      title: string;
      description: string;
    };
    screenFree: {
      title: string;
      description: string;
    };
    analytics: {
      title: string;
      description: string;
    };
  };
  useCases: {
    title: string;
    logistics: {
      title: string;
      description: string;
    };
    manufacturing: {
      title: string;
      description: string;
    };
    horeca: {
      title: string;
      description: string;
    };
    agriculture: {
      title: string;
      description: string;
    };
  };
  socialProof: {
    title: string;
    description: string;
    ukrainianSupport: string;
    cta: string;
  };
  pricing: {
    title: string;
    description: string;
    team: {
      name: string;
      users: string;
      credits: string;
      description: string;
      price: string;
    };
    business: {
      name: string;
      users: string;
      credits: string;
      description: string;
      price: string;
    };
    enterprise: {
      name: string;
      users: string;
      credits: string;
      description: string;
      price: string;
    };
    cta: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
    cta: string;
  };
}

const businessTranslations: Record<string, BusinessTranslations> = {
  uk: {
    nav: {
      demo: "Демо",
      pricing: "Тарифи", 
      useCase: "Застосування",
      about: "Про нас"
    },
    hero: {
      title: "Підвищте безпеку та продуктивність. Миттєво.",
      subtitle: "Elvarika перетворює ваші робочі інструкції, документи та процедури на ефективні аудіоуроки для вашої команди. Співробітники навчаються специфічній лексиці будь-де та будь-коли, навіть не відриваючись від роботи.",
      ctaPrimary: "Замовити демо для бізнесу",
      ctaSecondary: "Спробувати безкоштовно"
    },
    problems: {
      title: "Мовний бар'єр – це більше, ніж просто нерозуміння. Це вимірювані бізнес-ризики.",
      safety: {
        title: "Ризики для безпеки",
        description: "Нерозуміння інструкцій з техніки безпеки призводить до виробничого травматизму, штрафів та репутаційних втрат. Норвезька інспекція праці вказує на це як на суттєвий фактор ризику."
      },
      productivity: {
        title: "Зниження продуктивності",
        description: "Помилки у виконанні завдань, псування обладнання та затягнутий онбординг нових співробітників прямо впливають на операційну ефективність."
      },
      costs: {
        title: "Високі витрати",
        description: "Відправляти сотні працівників на загальні мовні курси – дорого, довго і неефективно для вивчення специфічної робочої лексики \"тут і зараз\"."
      },
      sales: {
        title: "Втрата продажів",
        description: "У клієнтських сервісах нездатність зрозуміти запит клієнта призводить до втрачених продажів та негативних відгуків."
      }
    },
    solution: {
      title: "Як працює Elvarika: Ваш персональний лінгвістичний процесор",
      step1: {
        title: "Завантажуєте будь-який контент",
        description: "Просто надайте системі текстовий документ, фотографію інструкції або навіть голосове повідомлення."
      },
      step2: {
        title: "Elvarika генерує аудіоурок",
        description: "Наш унікальний педагогічний рушій автоматично виділяє ключову лексику, створює \"Якірний Контекст\" з вашого документа для стандартизації знань, перекладає та якісно озвучує матеріал."
      },
      step3: {
        title: "Команда навчається ефективно",
        description: "Співробітники слухають готові плейлисти, а вбудований алгоритм інтервальних повторень (SRS) забезпечує довготривале запам'ятовування."
      }
    },
    features: {
      title: "Не просто \"озвучувач тексту\", а потужний інструмент для навчання",
      anchor: {
        title: "\"Якірний Контекст\"",
        description: "Для кожного терміну система використовує речення з вашого оригінального документа. Це гарантує, що вся команда розуміє критичну інформацію однаково та недвозначно."
      },
      srs: {
        title: "Інтелектуальне повторення (SRS)",
        description: "Система автоматично створює нові речення для повторення, вплітаючи в них слова, які учень починає забувати. Це науково доведений метод для максимальної ефективності засвоєння."
      },
      screenFree: {
        title: "\"Screen-free\" навчання",
        description: "Пасивний аудіоформат дозволяє інтегрувати навчання в робочий процес або повсякденні справи без втрати часу. Ідеально для зайнятих дорослих."
      },
      analytics: {
        title: "Аналітика для HR",
        description: "Адміністративна панель надає керівникам дані про прогрес навчання команди. Оцінюйте ефективність інвестицій та контролюйте засвоєння знань."
      }
    },
    useCases: {
      title: "Створено для галузей, де кожне слово має значення",
      logistics: {
        title: "Логістика та склади",
        description: "Швидке засвоєння термінології: \"навантажувач\" (gaffeltruck), \"маркування вантажів\", \"техніка безпеки\". Підвищуйте безпеку та швидкість роботи на складі."
      },
      manufacturing: {
        title: "Виробництво та будівництво",
        description: "Вивчення назв обладнання, технологічних процесів та правил безпеки на майданчику. Мінімізуйте ризик помилок та нещасних випадків."
      },
      horeca: {
        title: "HoReCa та сфера послуг",
        description: "Засвоєння стандартів обслуговування, меню та фраз для роботи з клієнтами. Покращуйте якість сервісу та збільшуйте продажі."
      },
      agriculture: {
        title: "Сільське господарство",
        description: "Розуміння сезонних інструкцій, назв техніки та правил роботи. Забезпечуйте ефективність та безпеку сезонних працівників."
      }
    },
    socialProof: {
      title: "Потужний інструмент для інтеграції. Безкоштовний для особистого використання.",
      description: "Ми віримо, що мова не має бути перешкодою для реалізації потенціалу. Elvarika пропонує повнофункціональну безкоштовну версію для індивідуальних користувачів.",
      ukrainianSupport: "Особливий фокус на підтримці українських біженців у Норвегії: Наша платформа допомагає швидко вивчити саме ту лексику, яка потрібна для працевлаштування та інтеграції в новій країні.",
      cta: "Створити свій перший урок безкоштовно"
    },
    pricing: {
      title: "Прозорі тарифи для бізнесу будь-якого розміру",
      description: "Ми впровадили інноваційну модель \"Навчальних Кредитів\". Ви платите лише за момент генерації нового навчального контенту. Прослуховування всіх створених уроків є безлімітним для всієї команди.",
      team: {
        name: "Team",
        users: "до 20 користувачів",
        credits: "10,000 кредитів/міс",
        description: "Ідеально для малих команд та відділів",
        price: "від 3,000 NOK/міс"
      },
      business: {
        name: "Business",
        users: "до 100 користувачів",
        credits: "50,000 кредитів/міс",
        description: "Для середніх підприємств",
        price: "від 12,000 NOK/міс"
      },
      enterprise: {
        name: "Enterprise",
        users: "від 100 користувачів",
        credits: "Індивідуальний пул кредитів",
        description: "Для великих корпорацій та специфічних потреб",
        price: "За запитом"
      },
      cta: "Отримати консультацію та підібрати план"
    },
    finalCta: {
      title: "Готові перетворити мовні бар'єри на вашу конкурентну перевагу?",
      subtitle: "Дізнайтеся, як Elvarika може знизити ризики та підвищити ефективність саме вашої компанії.",
      cta: "Замовити персональну демонстрацію"
    }
  },
  no: {
    nav: {
      demo: "Demo",
      pricing: "Priser",
      useCase: "Bruksområder", 
      about: "Om oss"
    },
    hero: {
      title: "Øk sikkerhet og produktivitet. Øyeblikkelig.",
      subtitle: "Elvarika transformerer dine arbeidsrrutiner, dokumenter og prosedyrer til effektive lydleksjoner for teamet ditt. Ansatte lærer spesialisert terminologi hvor som helst og når som helst, uten å forstyrre arbeidsflyten.",
      ctaPrimary: "Bestill bedriftsdemo",
      ctaSecondary: "Prøv gratis"
    },
    problems: {
      title: "Språkbarrierer er mer enn bare misforståelser. Det er målbare forretningsrisikoer.",
      safety: {
        title: "Sikkerhetsrisikoer",
        description: "Misforståelse av sikkerhetsinstruksjoner fører til arbeidsulykker, bøter og omdømmetap. Arbeidstilsynet peker på dette som en betydelig risikofaktor."
      },
      productivity: {
        title: "Redusert produktivitet",
        description: "Feil i oppgavegjennomføring, utstyrsødeleggelse og forlenget onboarding av nye ansatte påvirker direkte operasjonell effektivitet."
      },
      costs: {
        title: "Høye kostnader",
        description: "Å sende hundrevis av arbeidere på generelle språkkurs er dyrt, tidkrevende og ineffektivt for å lære spesialisert arbeidsrelatert vokabular 'her og nå'."
      },
      sales: {
        title: "Tapt salg",
        description: "I kundeservice fører manglende evne til å forstå kundebehov til tapte salg og negative anmeldelser."
      }
    },
    solution: {
      title: "Hvordan Elvarika fungerer: Din personlige språkprosessor",
      step1: {
        title: "Last opp hvilket som helst innhold",
        description: "Bare gi systemet et tekstdokument, bilde av instruksjoner eller til og med en lydmelding."
      },
      step2: {
        title: "Elvarika genererer lydleksjon",
        description: "Vår unike pedagogiske motor identifiserer automatisk nøkkelterminologi, skaper 'Anker-kontekst' fra ditt dokument for standardisert kunnskap, oversetter og produserer høykvalitets lyd."
      },
      step3: {
        title: "Teamet lærer effektivt",
        description: "Ansatte lytter til ferdige spillelister, mens den innebygde algoritmen for fordelt repetisjon (SRS) sikrer langsiktig læring."
      }
    },
    features: {
      title: "Ikke bare en 'tekst-til-tale', men et kraftig læringsverktøy",
      anchor: {
        title: "'Anker-kontekst'",
        description: "For hvert begrep bruker systemet setninger fra ditt originale dokument. Dette garanterer at hele teamet forstår kritisk informasjon likt og utvetydig."
      },
      srs: {
        title: "Intelligent repetisjon (SRS)",
        description: "Systemet skaper automatisk nye setninger for repetisjon, som vever inn ord som eleven begynner å glemme. Dette er en vitenskapelig bevist metode for maksimal læringseffektivitet."
      },
      screenFree: {
        title: "'Skjermfritt' læring",
        description: "Passivt lydformat lar deg integrere læring i arbeidsprosessen eller daglige gjøremål uten tidstap. Perfekt for travle voksne."
      },
      analytics: {
        title: "HR-analytikk",
        description: "Administrasjonspanelet gir ledere data om teamets læringsfremgang. Evaluer investeringseffektivitet og overvåk kunnskapstilegnelse."
      }
    },
    useCases: {
      title: "Laget for bransjer der hvert ord betyr noe",
      logistics: {
        title: "Logistikk og lager",
        description: "Rask tilegnelse av terminologi: 'gaffeltruck', 'varemerking', 'sikkerhetsprosedyrer'. Øk sikkerhet og arbeidseffektivitet på lageret."
      },
      manufacturing: {
        title: "Produksjon og bygg",
        description: "Læring av utstyrsnavn, teknologiske prosesser og sikkerhetsregler på arbeidsplassen. Minimer risiko for feil og ulykker."
      },
      horeca: {
        title: "HoReCa og service",
        description: "Tilegnelse av servicestandarder, menyer og kundeservicefraser. Forbedre servicekvalitet og øk salget."
      },
      agriculture: {
        title: "Landbruk",
        description: "Forståelse av sesongbaserte instruksjoner, utstyrsnavn og arbeidsregler. Sikre effektivitet og sikkerhet for sesongarbeidere."
      }
    },
    socialProof: {
      title: "Kraftig integrasjonsverktøy. Gratis for personlig bruk.",
      description: "Vi tror at språk ikke skal være en hindring for å realisere potensial. Elvarika tilbyr en fullt funksjonell gratis versjon for individuelle brukere.",
      ukrainianSupport: "Spesiell fokus på støtte til ukrainske flyktninger i Norge: Vår plattform hjelper med å raskt lære akkurat det vokabularet som trengs for sysselsetting og integrasjon i et nytt land.",
      cta: "Lag din første leksjon gratis"
    },
    pricing: {
      title: "Transparente priser for bedrifter av alle størrelser",
      description: "Vi har introdusert en innovativ 'Læringskreditt'-modell. Du betaler kun for øyeblikket når nytt læringinnhold genereres. Lytting til alle opprettede leksjoner er ubegrenset for hele teamet.",
      team: {
        name: "Team",
        users: "opptil 20 brukere",
        credits: "10,000 kreditter/mnd",
        description: "Ideelt for små team og avdelinger",
        price: "fra 3,000 NOK/mnd"
      },
      business: {
        name: "Business", 
        users: "opptil 100 brukere",
        credits: "50,000 kreditter/mnd",
        description: "For mellomstore bedrifter",
        price: "fra 12,000 NOK/mnd"
      },
      enterprise: {
        name: "Enterprise",
        users: "fra 100 brukere",
        credits: "Individuell kredittpool",
        description: "For store selskaper og spesifikke behov",
        price: "På forespørsel"
      },
      cta: "Få konsultasjon og velg plan"
    },
    finalCta: {
      title: "Klar til å gjøre språkbarrierer til ditt konkurransefortrinn?",
      subtitle: "Finn ut hvordan Elvarika kan redusere risiko og øke effektiviteten i nettopp din bedrift.",
      cta: "Bestill personlig demonstrasjon"
    }
  },
  en: {
    nav: {
      demo: "Demo",
      pricing: "Pricing",
      useCase: "Use Cases",
      about: "About"
    },
    hero: {
      title: "Increase safety and productivity. Instantly.",
      subtitle: "Elvarika transforms your work instructions, documents and procedures into effective audio lessons for your team. Employees learn specialized vocabulary anywhere and anytime, without interrupting their workflow.",
      ctaPrimary: "Book business demo",
      ctaSecondary: "Try for free"
    },
    problems: {
      title: "Language barriers are more than just misunderstandings. They are measurable business risks.",
      safety: {
        title: "Safety risks",
        description: "Misunderstanding safety instructions leads to workplace injuries, fines and reputational damage. The Norwegian Labour Inspection Authority points to this as a significant risk factor."
      },
      productivity: {
        title: "Reduced productivity",
        description: "Errors in task execution, equipment damage and prolonged onboarding of new employees directly impact operational efficiency."
      },
      costs: {
        title: "High costs",
        description: "Sending hundreds of workers to general language courses is expensive, time-consuming and ineffective for learning specialized work vocabulary 'here and now'."
      },
      sales: {
        title: "Lost sales",
        description: "In customer service, inability to understand customer needs leads to lost sales and negative reviews."
      }
    },
    solution: {
      title: "How Elvarika works: Your personal linguistic processor",
      step1: {
        title: "Upload any content",
        description: "Simply provide the system with a text document, photo of instructions or even a voice message."
      },
      step2: {
        title: "Elvarika generates audio lesson",
        description: "Our unique pedagogical engine automatically identifies key terminology, creates 'Anchor Context' from your document for standardized knowledge, translates and produces high-quality audio."
      },
      step3: {
        title: "Team learns effectively",
        description: "Employees listen to ready playlists, while the built-in spaced repetition algorithm (SRS) ensures long-term retention."
      }
    },
    features: {
      title: "Not just a 'text-to-speech', but a powerful learning tool",
      anchor: {
        title: "'Anchor Context'",
        description: "For each term, the system uses sentences from your original document. This guarantees that the entire team understands critical information uniformly and unambiguously."
      },
      srs: {
        title: "Intelligent repetition (SRS)",
        description: "The system automatically creates new sentences for repetition, weaving in words that the learner begins to forget. This is a scientifically proven method for maximum learning efficiency."
      },
      screenFree: {
        title: "'Screen-free' learning",
        description: "Passive audio format allows integrating learning into work processes or daily tasks without time loss. Perfect for busy adults."
      },
      analytics: {
        title: "HR analytics",
        description: "The admin panel provides managers with data on team learning progress. Evaluate investment effectiveness and monitor knowledge acquisition."
      }
    },
    useCases: {
      title: "Built for industries where every word matters",
      logistics: {
        title: "Logistics and warehouses",
        description: "Rapid acquisition of terminology: 'forklift', 'cargo labeling', 'safety procedures'. Increase safety and work efficiency in the warehouse."
      },
      manufacturing: {
        title: "Manufacturing and construction",
        description: "Learning equipment names, technological processes and safety rules on site. Minimize risk of errors and accidents."
      },
      horeca: {
        title: "HoReCa and services",
        description: "Acquisition of service standards, menus and customer service phrases. Improve service quality and increase sales."
      },
      agriculture: {
        title: "Agriculture",
        description: "Understanding seasonal instructions, equipment names and work rules. Ensure efficiency and safety of seasonal workers."
      }
    },
    socialProof: {
      title: "Powerful integration tool. Free for personal use.",
      description: "We believe that language should not be a barrier to realizing potential. Elvarika offers a fully functional free version for individual users.",
      ukrainianSupport: "Special focus on supporting Ukrainian refugees in Norway: Our platform helps quickly learn exactly the vocabulary needed for employment and integration in a new country.",
      cta: "Create your first lesson for free"
    },
    pricing: {
      title: "Transparent pricing for businesses of any size",
      description: "We have introduced an innovative 'Learning Credits' model. You only pay for the moment when new learning content is generated. Listening to all created lessons is unlimited for the entire team.",
      team: {
        name: "Team",
        users: "up to 20 users",
        credits: "10,000 credits/month",
        description: "Ideal for small teams and departments",
        price: "from 3,000 NOK/month"
      },
      business: {
        name: "Business",
        users: "up to 100 users", 
        credits: "50,000 credits/month",
        description: "For medium-sized enterprises",
        price: "from 12,000 NOK/month"
      },
      enterprise: {
        name: "Enterprise",
        users: "from 100 users",
        credits: "Individual credit pool",
        description: "For large corporations and specific needs",
        price: "On request"
      },
      cta: "Get consultation and choose plan"
    },
    finalCta: {
      title: "Ready to turn language barriers into your competitive advantage?",
      subtitle: "Discover how Elvarika can reduce risks and increase efficiency in your specific company.",
      cta: "Order personal demonstration"
    }
  }
};

export const Business: React.FC = () => {
  const { language, translations: _, changeLanguage } = useLanguage();
  const t = businessTranslations[language] || businessTranslations['en'];
  const [showDemo, setShowDemo] = useState(false);
  const [demoTranslationTarget, setDemoTranslationTarget] = useState<'uk' | 'en'>('uk');
  const [hasAccessToDemo, setHasAccessToDemo] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const handleDemoAccess = () => {
    setHasAccessToDemo(true);
    setShowDemo(true);
  };

  const sections = [
    // Hero Section
    <section key="hero" className="h-screen flex items-center justify-center bg-gradient-to-br from-[#defff0] to-[#f0fff4] relative">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-[#022f36] mb-6 leading-tight">
          {t.hero.title}
        </h1>
        <p className="text-xl text-[#022f36] max-w-4xl mx-auto mb-8 leading-relaxed">
          {t.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => setShowDemo(true)}
            variant="outline" 
            className="border-[#022f36] text-[#022f36] hover:bg-[#022f36] hover:text-white px-8 py-3 text-lg"
          >
            {language === 'no' ? 'Se hvordan det fungerer' :
             language === 'uk' ? 'Подивитися, як це працює' :
             'See how it works'}
          </Button>
        </div>
      </div>
      <div className="absolute top-6 right-6">
        <LanguageSwitcher currentLanguage={language} onLanguageChange={changeLanguage} />
      </div>
    </section>,

    // Use Cases Section
    <section key="usecases" className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-16 overflow-y-auto">
      <div className="container mx-auto px-4 max-w-5xl w-full">
        <h2 className="text-4xl font-bold text-[#022f36] text-center mb-12">
          {language === 'no' ? 'Bruksområder for ulike bransjer' :
           language === 'uk' ? 'Варіанти використання для різних галузей' :
           'Use Cases for Different Industries'}
        </h2>
        
        <Tabs defaultValue="logistics" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="logistics" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <Truck className="h-4 w-4" />
              {language === 'no' ? 'Logistikk' :
               language === 'uk' ? 'Логістика' :
               'Logistics'}
            </TabsTrigger>
            <TabsTrigger value="construction" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <HardHat className="h-4 w-4" />
              {language === 'no' ? 'Bygg & Anlegg' :
               language === 'uk' ? 'Будівництво' :
               'Construction'}
            </TabsTrigger>
            <TabsTrigger value="horeca" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <Coffee className="h-4 w-4" />
              {language === 'no' ? 'HoReCa' :
               language === 'uk' ? 'HoReCa' :
               'HoReCa'}
            </TabsTrigger>
            <TabsTrigger value="agriculture" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <Tractor className="h-4 w-4" />
              {language === 'no' ? 'Landbruk' :
               language === 'uk' ? 'Сільське господарство' :
               'Agriculture'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="logistics">
            <Card className="border-l-4 border-blue-500">
              <CardHeader>
                <CardTitle className="text-2xl text-[#022f36] flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  {language === 'no' ? 'Logistikk og lagerhold' :
                   language === 'uk' ? 'Логістика та складське господарство' :
                   'Logistics and Warehousing'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {language === 'no' ? 
                    'Jan leder en stor logistikkterminal i Oslo med 60% utenlandske arbeidere. Språkbarrierer fører til skadet last og 50 000 kroner i erstatningskrav fra en misforstått instruksjon om temperaturkritisk håndtering.' :
                   language === 'uk' ?
                    'Ян керує великим логістичним терміналом в Осло з 60% іноземних працівників. Мовні бар\'єри призводять до пошкодженого вантажу та 50 000 крон компенсаційних позовів через неправильно зрозуміну інструкцію.' :
                    'Jan manages a large logistics terminal in Oslo with 60% foreign workers. Language barriers lead to damaged cargo and 50,000 kroner in compensation claims from misunderstood temperature-critical handling instructions.'}
                </p>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {language === 'no' ? 'Elvarika-løsning:' :
                     language === 'uk' ? 'Рішення Elvarika:' :
                     'Elvarika Solution:'}
                  </h4>
                  <p className="text-green-700 text-sm">
                    {language === 'no' ?
                      'PDF instruksjoner blir til personaliserte lydleksjoner på 5 minutter. Nye arbeidere hører på ukrainsk: "Temperaturfølsom last må holdes mellom 2-8 grader."' :
                     language === 'uk' ?
                      'PDF інструкції перетворюються на персоналізовані аудіоуроки за 5 хвилин. Нові працівники чують українською: "Температурочутливий вантаж повинен зберігатися при 2-8 градусах."' :
                      'PDF instructions become personalized audio lessons in 5 minutes. New workers hear in Ukrainian: "Temperature-sensitive cargo must be kept between 2-8 degrees."'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="construction">
            <Card className="border-l-4 border-orange-500">
              <CardHeader>
                <CardTitle className="text-2xl text-[#022f36] flex items-center gap-3">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  {language === 'no' ? 'Bygg og anlegg' :
                   language === 'uk' ? 'Будівництво' :
                   'Construction'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {language === 'no' ?
                    'Anna, HSE-manager, håndterer et multinasjonalt byggeprosjekt. En litauisk arbeider misforsto trykkluftprosedyrer, noe som resulterte i 150 000 kroner i bøter og tre dagers prosjektstopp.' :
                   language === 'uk' ?
                    'Анна, HSE-менеджер, керує багатонаціональним будівельним проектом. Литовський робітник неправильно зрозумів процедури пневматики, що призвело до 150 000 крон штрафів та трьох днів зупинки проекту.' :
                    'Anna, HSE manager, handles a multinational construction project. A Lithuanian worker misunderstood pneumatic procedures, resulting in 150,000 kroner in fines and three days of project shutdown.'}
                </p>
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-800 mb-2">
                    {language === 'no' ? 'Elvarika-løsning:' :
                     language === 'uk' ? 'Рішення Elvarika:' :
                     'Elvarika Solution:'}
                  </h4>
                  <p className="text-orange-700 text-sm">
                    {language === 'no' ?
                      'Sikkerhetsinstruksjoner blir til målrettede lydguider. Arbeidere hører: "Sjekk at trykket ikke overstiger 6 bar. Bruk alltid sikkerhetsutstyr."' :
                     language === 'uk' ?
                      'Інструкції безпеки стають цільовими аудіогідами. Робітники чують: "Перевірте, що тиск не перевищує 6 бар. Завжди використовуйте засоби захисту."' :
                      'Safety instructions become targeted audio guides. Workers hear: "Check that pressure does not exceed 6 bar. Always use safety equipment."'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="horeca">
            <Card className="border-l-4 border-purple-500">
              <CardHeader>
                <CardTitle className="text-2xl text-[#022f36] flex items-center gap-3">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  HoReCa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {language === 'no' ?
                    'David eier en hotellkjede. En servitør misforsto glutenallergi-forespørsel, noe som førte til alvorlig allergisk reaksjon og negativ medieomtale.' :
                   language === 'uk' ?
                    'Давід володіє готельною мережею. Офіціантка неправильно зрозуміла запит про алергію на глютен, що призвело до серйозної алергічної реакції та негативної реклами в ЗМІ.' :
                    'David owns a hotel chain. A waitress misunderstood a gluten allergy request, leading to a serious allergic reaction and negative media coverage.'}
                </p>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-800 mb-2">
                    {language === 'no' ? 'Elvarika-løsning:' :
                     language === 'uk' ? 'Рішення Elvarika:' :
                     'Elvarika Solution:'}
                  </h4>
                  <p className="text-purple-700 text-sm">
                    {language === 'no' ?
                      'Menyer og allergenlister blir til kontekstuelle lydguider. Ansatte lærer: "Kunden spør om gluten. Sjekk ingredienslisten. Informer kjøkkenet."' :
                     language === 'uk' ?
                      'Меню та списки алергенів стають контекстуальними аудіогідами. Співробітники вивчають: "Клієнт питає про глютен. Перевірте інгредієнти. Повідомте кухню."' :
                      'Menus and allergen lists become contextual audio guides. Staff learn: "Customer asks about gluten. Check ingredients. Inform kitchen."'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agriculture">
            <Card className="border-l-4 border-green-600">
              <CardHeader>
                <CardTitle className="text-2xl text-[#022f36] flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  {language === 'no' ? 'Landbruk' :
                   language === 'uk' ? 'Сільське господарство' :
                   'Agriculture'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {language === 'no' ?
                    'Lars leder en fiskeprosesseringsfabrikk. En polsk arbeider misforsto temperaturkontroll for laks, som resulterte i ødeleggelse av 2 tonn fisk til en verdi av 400 000 kroner.' :
                   language === 'uk' ?
                    'Ларс керує рибопереробною фабрикою. Польський робітник неправильно зрозумів температурний контроль лосося, що призвело до знищення 2 тонн риби вартістю 400 000 крон.' :
                    'Lars manages a fish processing factory. A Polish worker misunderstood salmon temperature control, resulting in destruction of 2 tons of fish worth 400,000 kroner.'}
                </p>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {language === 'no' ? 'Elvarika-løsning:' :
                     language === 'uk' ? 'Рішення Elvarika:' :
                     'Elvarika Solution:'}
                  </h4>
                  <p className="text-green-700 text-sm">
                    {language === 'no' ?
                      'Daglige instruksjoner fra 2-minutters talemelding. Arbeidere hører: "Fersk laks må holdes konstant mellom 0-2 grader. Sjekk temperatur hver time."' :
                     language === 'uk' ?
                      'Денні інструкції з 2-хвилинного голосового повідомлення. Робітники чують: "Свіжий лосось повинен зберігатися при 0-2 градусах. Перевіряйте температуру щогодини."' :
                      'Daily instructions from 2-minute voice message. Workers hear: "Fresh salmon must be kept constantly between 0-2 degrees. Check temperature every hour."'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  ];

  if (showDemo && !hasAccessToDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#defff0] to-[#f0fff4] flex items-center justify-center">
        <div className="w-full max-w-lg mx-auto px-4">
          <DemoAccessForm onAccessGranted={handleDemoAccess} language={language} />
        </div>
      </div>
    );
  }

  if (showDemo && hasAccessToDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#defff0] to-[#f0fff4]">
        <div className="p-6">
          <Button 
            onClick={() => {
              setShowDemo(false);
              setHasAccessToDemo(false);
            }}
            variant="outline" 
            className="border-[#022f36] text-[#022f36] hover:bg-[#022f36] hover:text-white"
          >
            {language === 'no' ? '← Tilbake til hovedside' :
             language === 'uk' ? '← Назад до головної' :
             '← Back to main'}
          </Button>
        </div>
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold text-[#022f36] mb-8 text-center">
            {language === 'no' ? 'Se hvordan Elvarika fungerer' : 
             language === 'uk' ? 'Подивіться, як працює Elvarika' : 
             'See how Elvarika works'}
          </h1>
          <CompactAnimatedDemo translationTarget={demoTranslationTarget} />
        </div>
      </div>
    );
  }

  return (
    <FullScreenScrolling onSectionChange={setCurrentSection}>
      {sections}
    </FullScreenScrolling>
  );
};

export default Business;
              <div className="flex items-center justify-between">
                <Button 
                  onClick={() => setShowDemo(false)}
                  variant="outline" 
                  className="border-[#022f36] text-[#022f36] hover:bg-[#022f36] hover:text-white text-lg px-6 py-2"
                >
                  {language === 'no' ? '← Tilbake til hovedside' :
                   language === 'uk' ? '← Назад до головної' :
                   '← Back to main'}
                </Button>
                
                <div className="flex flex-col items-center">
                  <h1 className="text-3xl font-bold text-[#022f36] mb-2">
                    {language === 'no' ? 'Se hvordan Elvarika fungerer' : 
                     language === 'uk' ? 'Подивіться, як працює Elvarika' : 
                     'See how Elvarika works'}
                  </h1>
                  <p className="text-xl text-gray-600 font-medium">
                    {language === 'no' ? 'Fra norsk tekst til flerspråklig lydordbok på 30 sekunder' :
                     language === 'uk' ? 'З норвезького тексту до багатомовного аудіословника за 30 секунд' :
                     'From Norwegian text to multilingual audio dictionary in 30 seconds'}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-white rounded-lg p-1 border">
                    <span className="text-xs text-gray-500 px-2">
                      {language === 'no' ? 'Oversett til:' :
                       language === 'uk' ? 'Переклад на:' :
                       'Translate to:'}
                    </span>
                    <button
                      onClick={() => setDemoTranslationTarget('uk')}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        demoTranslationTarget === 'uk' 
                          ? 'bg-[#022f36] text-white' 
                          : 'text-gray-600 hover:text-[#022f36]'
                      }`}
                    >
                      🇺🇦
                    </button>
                    <button
                      onClick={() => setDemoTranslationTarget('en')}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        demoTranslationTarget === 'en' 
                          ? 'bg-[#022f36] text-white' 
                          : 'text-gray-600 hover:text-[#022f36]'
                      }`}
                    >
                      🇬🇧
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Demo content with increased height */}
              <div className="flex-1 min-h-[700px]">
                <CompactAnimatedDemo translationTarget={demoTranslationTarget} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Use Cases Section with Tabs */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#022f36] text-center mb-12">
            {language === 'no' ? 'Bruksområder for ulike bransjer' :
             language === 'uk' ? 'Варіанти використання для різних галузей' :
             'Use Cases for Different Industries'}
          </h2>
          
          <Tabs defaultValue="logistics" className="w-full max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="logistics" className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {language === 'no' ? 'Logistikk' :
                 language === 'uk' ? 'Логістика' :
                 'Logistics'}
              </TabsTrigger>
              <TabsTrigger value="construction" className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                {language === 'no' ? 'Bygg & Anlegg' :
                 language === 'uk' ? 'Будівництво' :
                 'Construction'}
              </TabsTrigger>
              <TabsTrigger value="horeca" className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                {language === 'no' ? 'HoReCa' :
                 language === 'uk' ? 'HoReCa' :
                 'HoReCa'}
              </TabsTrigger>
              <TabsTrigger value="agriculture" className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                {language === 'no' ? 'Landbruk' :
                 language === 'uk' ? 'Сільське господарство' :
                 'Agriculture'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="logistics" className="mt-8">
              <Card className="border-l-4 border-blue-500">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#022f36] flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    {language === 'no' ? 'Logistikk og lagerhold' :
                     language === 'uk' ? 'Логістика та складське господарство' :
                     'Logistics and Warehousing'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {language === 'no' ? 
                      'Forestill deg Jan, leder av en stor logistikkterminal i Oslo. Teamet hans består av 60% utenlandske arbeidere fra Polen, Litauen og Ukraina. Daglig møter han økonomiske tap på grunn av språkbarrierer: skadet last på grunn av misforståelser, forsinket behandling av forsendelser og feil i dokumentasjon. En polsk gaffeltruck-operatør misforsto instruksjoner om håndtering av temperaturkritisk last, noe som resulterte i 50 000 kroner i erstatningskrav. Språkproblemer fører til forsinkelser i lasting og lossing, som direkte påvirker logistikkjeden til store kunder som Posten Norge og DHL.' :
                     language === 'uk' ?
                      'Уявіть собі Яна, керівника великого логістичного термінала в Осло. Його команда на 60% складається з іноземних працівників з Польщі, Литви та України. Щодня він стикається з фінансовими втратами через мовні бар\'єри: пошкоджені вантажі через неправильне розуміння, затримки в обробці відправлень та помилки в документації. Польський оператор навантажувача неправильно зрозумів інструкції щодо поводження з температурно-чутливим вантажем, що призвело до 50 000 крон компенсаційних позовів. Мовні проблеми спричинюють затримки в завантаженні та розвантаженні, що безпосередньо впливає на логістичний ланцюг великих клієнтів, таких як Posten Norge та DHL.' :
                      'Imagine Jan, manager of a large logistics terminal in Oslo. His team consists of 60% foreign workers from Poland, Lithuania and Ukraine. Daily he faces financial losses due to language barriers: damaged cargo due to misunderstandings, delayed shipment processing and documentation errors. A Polish forklift operator misunderstood instructions about handling temperature-critical cargo, resulting in 50,000 kroner in compensation claims. Language problems cause delays in loading and unloading, which directly affects the logistics chain of major clients like Posten Norge and DHL.'}
                  </p>
                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">
                      {language === 'no' ? 'Elvarika-løsning:' :
                       language === 'uk' ? 'Рішення Elvarika:' :
                       'Elvarika Solution:'}
                    </h4>
                    <p className="text-green-700 leading-relaxed">
                      {language === 'no' ?
                        'Jan laster opp standard sikkerhetsinstruksjoner (PDF, 10 sider). På 5 minutter genererer Elvarika personaliserte lydleksjoner for hele teamet. Den nye ukrainske arbeideren, som ikke engang har pakket ut kofferten sin, hører allerede i hodetelefonene: "Under lastehåndtering av farlig gods, sjekk alltid gul etikett først. Temperaturfølsom last må holdes mellom 2-8 grader." Systemet identifiserer automatisk kritiske termer som "gaffeltruck", "temperaturkontroll", "lastsikring" og "HMS-rutiner", og skaper korte, kontekstuelle forklaringer på ukrainsk.' :
                       language === 'uk' ?
                        'Ян завантажує в систему стандартну інструкцію з техніки безпеки на складі (PDF, 10 сторінок). За 5 хвилин Elvarika генерує персоналізований аудіоурок для всієї команди. Новий працівник з України, ще не розпакувавши валізи, вже слухає у навушниках: "Під час вантажних операцій з небезпечними речовинами завжди спочатку перевіряйте жовту етикетку. Температурочутливий вантаж повинен зберігатися при температурі від 2 до 8 градусів." Система автоматично виявляє критичні терміни як "навантажувач", "температурний контроль", "кріплення вантажу" і "правила БТ", та створює короткі контекстуальні пояснення українською.' :
                        'Jan uploads standard safety instructions (PDF, 10 pages). In 5 minutes, Elvarika generates personalized audio lessons for the entire team. The new Ukrainian worker, not even having unpacked his suitcase, is already listening in headphones: "During cargo operations with dangerous goods, always check the yellow label first. Temperature-sensitive cargo must be kept between 2-8 degrees." The system automatically identifies critical terms like "forklift", "temperature control", "cargo securing" and "HSE procedures", and creates short contextual explanations in Ukrainian.'}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-[#022f36] mb-3">
                      {language === 'no' ? 'Resultat for investorer:' :
                       language === 'uk' ? 'Результат для інвесторів:' :
                       'Result for Investors:'}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {language === 'no' ?
                        'Elvarika er ikke et "vitamin", det er "aspirin" mot akutt smerte. Vi tilbyr målbar reduksjon av økonomiske tap, redusert risiko for bøter og økt operasjonell effektivitet. Logistikkmarkedet i Norge er enormt og har høy potensial for skalering internasjonalt. For investorer betyr dette tilgang til et marked med sterke regulatoriske krav og høy betalingsvilje for kvalitetsløsninger.' :
                       language === 'uk' ?
                        'Elvarika – це не "вітамін", це "аспірин" від гострого болю. Ми пропонуємо вимірюване зниження фінансових втрат, зменшення ризику штрафів та підвищення операційної ефективності. Ринок логістики в Норвегії величезний і має високий потенціал для міжнародного масштабування. Для інвесторів це означає доступ до ринку з суворими регулятивними вимогами та високою готовністю платити за якісні рішення.' :
                        'Elvarika is not a "vitamin", it\'s "aspirin" for acute pain. We offer measurable reduction of financial losses, reduced risk of fines and increased operational efficiency. The logistics market in Norway is enormous with high potential for international scaling. For investors, this means access to a market with strong regulatory requirements and high willingness to pay for quality solutions.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="construction" className="mt-8">
              <Card className="border-l-4 border-orange-500">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#022f36] flex items-center gap-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    {language === 'no' ? 'Produksjon og bygg og anlegg' :
                     language === 'uk' ? 'Виробництво та будівництво' :
                     'Manufacturing and Construction'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {language === 'no' ?
                      'Betrakt Anna, HSE-manager på et stort byggeprosjekt. Hun er ansvarlig for sikkerheten til et multinasjonalt team. Nylig skjedde det en hendelse på grunn av språkmisforståelser om terminologi for høytrykksutstyr som resulterte i prosjektstopp og bøter fra Arbeidstilsynet. En litauisk arbeider misforsto prosedyrer for bruk av trykkluftverktøy, noe som førte til skade på dyrt utstyr og en alvorlig nesten-ulykke. Selskapet mottok en bot på 150 000 kroner og måtte stoppe arbeidet i tre dager for undersøkelse. Annas største bekymring er at neste gang kan det gå liv tapt.' :
                     language === 'uk' ?
                      'Розглянемо Анну, HSE-менеджера на великому будівельному об\'єкті. Вона відповідає за безпеку багатонаціональної команди. Нещодавно через мовне непорозуміння щодо термінології роботи з обладнанням під високим тиском стався інцидент, що призвів до зупинки проекту та штрафів від Трудової інспекції. Литовський робітник неправильно зрозумів процедури використання пневматичного інструменту, що призвело до пошкодження дорогого обладнання та серйозного інциденту. Компанія отримала штраф 150 000 крон і була змушена зупинити роботу на три дні для розслідування. Найбільше занепокоєння Анни в тому, що наступного разу можуть загинути люди.' :
                      'Consider Anna, HSE manager at a large construction site. She is responsible for the safety of a multinational team. Recently, an incident occurred due to language misunderstandings about high-pressure equipment terminology resulting in project shutdown and fines from the Labor Inspection Authority. A Lithuanian worker misunderstood procedures for using pneumatic tools, leading to damage to expensive equipment and a serious near-accident. The company received a 150,000 kroner fine and had to stop work for three days for investigation. Anna\'s biggest concern is that next time lives could be lost.'}
                  </p>
                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">
                      {language === 'no' ? 'Elvarika-løsning:' :
                       language === 'uk' ? 'Рішення Elvarika:' :
                       'Elvarika Solution:'}
                    </h4>
                    <p className="text-green-700 leading-relaxed">
                      {language === 'no' ?
                        'Anna fotograferer instruksjoner for nytt utstyr og laster det opp til Elvarika. Før hun genererer leksjonen, gjennomgår hun listen over kandidatord som systemet foreslår og legger til noen få spesifikke termer hun vil fokusere på. Hun kontrollerer at systemet korrekt har identifisert kritiske sikkerhetsfraser. På 10 minutter har hun generert en omfattende lydguide. Litauiske arbeidere hører nå på sitt eget språk: "Før bruk av trykkluftverktøy: Sjekk at trykket ikke overstiger 6 bar. Bruk alltid sikkerhetsutstyr. Vent til luftslangen er helt stille før du kobler fra." Systemet vektlegger automatisk de mest kritiske sikkerhetsmessige ordene og frasene.' :
                       language === 'uk' ?
                        'Анна фотографує інструкцію до нового обладнання та завантажує її в Elvarika. Перед генерацією уроку вона переглядає список слів-кандидатів, що запропонувала система, і додає декілька специфічних термінів, на яких хоче зробити акцент. Вона перевіряє, що система правильно визначила критичні фрази безпеки. За 10 хвилин вона генерує комплексний аудіогід. Литовські робітники тепер чують своєю мовою: "Перед використанням пневматичного інструменту: перевірте, що тиск не перевищує 6 бар. Завжди використовуйте засоби захисту. Зачекайте, поки повітряний шланг повністю заспокоїться, перед від\'єднанням." Система автоматично підкреслює найкритичніші слова та фрази безпеки.' :
                        'Anna photographs instructions for new equipment and uploads them to Elvarika. Before generating the lesson, she reviews the candidate word list suggested by the system and adds a few specific terms she wants to focus on. She checks that the system has correctly identified critical safety phrases. In 10 minutes, she has generated a comprehensive audio guide. Lithuanian workers now hear in their own language: "Before using pneumatic tools: Check that pressure does not exceed 6 bar. Always use safety equipment. Wait until the air hose is completely still before disconnecting." The system automatically emphasizes the most critical safety words and phrases.'}
                    </p>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-[#022f36] mb-3">
                      {language === 'no' ? 'Resultat for investorer:' :
                       language === 'uk' ? 'Результат для інвесторів:' :
                       'Result for Investors:'}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {language === 'no' ?
                        'Vi forvandler uker med ineffektiv opplæring til timer med målrettet læring. For bygge- og produksjonsbedrifter betyr dette direkte kostnadsbesparelser, redusert risiko for HMS-brudd og økt produktivitet. Elvarika tilbyr unik tid-til-verdi der sikkerhetsnivået øker umiddelbart etter implementering. Dette er spesielt kritisk i bransjer hvor HMS-brudd kan føre til dødelige ulykker og millionbøter.' :
                       language === 'uk' ?
                        'Ми перетворюємо тижні неефективного онбордингу на години цільового навчання. Для будівельних та виробничих компаній це означає пряму економію коштів, зниження ризику порушень охорони праці та підвищення продуктивності. Elvarika пропонує унікальну швидкість виходу на цінність, де рівень безпеки підвищується відразу після впровадження. Це особливо критично в галузях, де порушення охорони праці можуть призвести до смертельних нещасних випадків та мільйонних штрафів.' :
                        'We transform weeks of ineffective onboarding into hours of targeted learning. For construction and manufacturing companies, this means direct cost savings, reduced risk of HSE violations and increased productivity. Elvarika offers unique time-to-value where safety levels increase immediately after implementation. This is especially critical in industries where HSE violations can lead to fatal accidents and million-kroner fines.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="horeca" className="mt-8">
              <Card className="border-l-4 border-purple-500">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#022f36] flex items-center gap-3">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    {language === 'no' ? 'HoReCa og tjenesteyting' :
                     language === 'uk' ? 'HoReCa та сфера послуг' :
                     'HoReCa and Services'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {language === 'no' ?
                      'David, eier av en hotell- og restaurantkjede, møter høy turnover og servicekvalitetsproblemer. En ny servitør fra Spania, som ikke helt forsto en kundes forespørsel om glutenallergi, serverte en rett som inneholdt skjulte allergener. Dette resulterte i en alvorlig allergisk reaksjon, ambulansetransport og omfattende juridiske konsekvenser. Hendelsen ble omtalt i lokalpressen, og flere booking-plattformer registrerte negative anmeldelser som påvirket bookingvolumer i ukene som fulgte. Davids største bekymring er ikke bare økonomisk tap, men risikoen for å skade kunders helse.' :
                     language === 'uk' ?
                      'Давід, власник мережі готелів та ресторанів, стикається з високою плинністю кадрів та проблемами якості обслуговування. Нова офіціантка з Іспанії, недостатньо добре зрозумівши запит клієнта щодо алергії на глютен, подала страву, що містила приховані алергени. Це призвело до серйозної алергічної реакції, виклику швидкої і серйозних юридичних наслідків. Інцидент висвітлила місцева преса, а на кількох платформах бронювання з\'явилися негативні відгуки, що вплинуло на обсяги бронювання в наступні тижні. Найбільше занепокоєння Давіда – це не тільки фінансові втрати, а й ризик завдати шкоди здоров\'ю клієнтів.' :
                      'David, owner of a hotel and restaurant chain, faces high turnover and service quality issues. A new waitress from Spain, not fully understanding a customer\'s gluten allergy request, served a dish containing hidden allergens. This resulted in a serious allergic reaction, ambulance transport and extensive legal consequences. The incident was covered in local press, and several booking platforms registered negative reviews that affected booking volumes in the following weeks. David\'s biggest concern is not just financial loss, but the risk of harming customers\' health.'}
                  </p>
                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">
                      {language === 'no' ? 'Elvarika-løsning:' :
                       language === 'uk' ? 'Рішення Elvarika:' :
                       'Elvarika Solution:'}
                    </h4>
                    <p className="text-green-700 leading-relaxed">
                      {language === 'no' ?
                        'David laster opp servicestandarder, meny og allergenliste til Elvarika. Plattformen genererer automatisk korte lydleksjoner som nye ansatte kan høre på vei til jobb. Den spanske servitøren hører ikke bare ord, men hele fraser i kontekst: "Kunden spør om gluten. Sjekk alltid ingredienslisten. Informer kjøkkenet om allergier umiddelbart. Hvis du er usikker, spør kjøkkenet direkte." Elvarika identifiserer automatisk kritiske allergenord som "nøtter", "laktose", "skalldyr" og skaper spesifikke lydklipp som forklarer prosedyrer for hver allergitype.' :
                       language === 'uk' ?
                        'Давід завантажує в Elvarika стандарти обслуговування, меню та список алергенів. Платформа автоматично генерує короткі аудіоуроки, які нові співробітники слухають дорогою на роботу. Іспанська офіціантка чує не просто слова, а цілі фрази в контексті: "Клієнт питає про глютен. Завжди перевіряйте список інгредієнтів. Негайно повідомте кухню про алергії. Якщо сумніваєтеся, запитайте кухню безпосередньо." Elvarika автоматично виявляє критичні слова алергенів як "горіхи", "лактоза", "морепродукти" і створює спеціальні аудіокліпи.' :
                        'David uploads service standards, menu and allergen list to Elvarika. The platform automatically generates short audio lessons that new employees can listen to on their way to work. The Spanish waitress doesn\'t just hear words, but complete phrases in context: "Customer asks about gluten. Always check ingredient list. Inform kitchen about allergies immediately. If uncertain, ask kitchen directly." Elvarika automatically identifies critical allergen words like "nuts", "lactose", "shellfish" and creates specific audio clips.'}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-[#022f36] mb-3">
                      {language === 'no' ? 'Resultat for investorer:' :
                       language === 'uk' ? 'Результат для інвесторів:' :
                       'Result for Investors:'}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {language === 'no' ?
                        'Elvarika påvirker direkte kundens inntekt. Forbedret personalkommunikasjon øker gjennomsnittlig regning, øker antall positive anmeldelser og bringer kunder tilbake. For HoReCa-sektoren, hvor omdømme og kundetilfredshet direkte oversettes til booking-volumer, tilbyr vi et verktøy som raskt tilpasser personalet, reduserer risiko for allergiske reaksjoner og øker total lønnsomhet. Dette er spesielt verdifullt i turistområder hvor negative opplevelser kan spre seg raskt gjennom sosiale medier.' :
                       language === 'uk' ?
                        'Elvarika напряму впливає на дохід клієнта. Покращення комунікації персоналу підвищує середній чек, збільшує кількість позитивних відгуків та повертає клієнтів знову. Для сектору HoReCa, де репутація та задоволеність клієнтів безпосередньо перетворюються на обсяги бронювання, ми пропонуємо інструмент, що швидко адаптує персонал, знижує ризик алергічних реакцій та підвищує загальну прибутковість. Це особливо цінно в туристичних районах, де негативний досвід може швидко поширитися через соціальні мережі.' :
                        'Elvarika directly impacts customer revenue. Improved staff communication increases average bill, increases positive reviews and brings customers back. For the HoReCa sector, where reputation and customer satisfaction directly translate to booking volumes, we offer a tool that quickly adapts staff, reduces risk of allergic reactions and increases overall profitability. This is especially valuable in tourist areas where negative experiences can spread rapidly through social media.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agriculture" className="mt-8">
              <Card className="border-l-4 border-green-600">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#022f36] flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                    {language === 'no' ? 'Landbruk og fiskeri' :
                     language === 'uk' ? 'Сільське господарство та рибальство' :
                     'Agriculture and Fishing'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {language === 'no' ?
                      'Lars leder en stor fiskeprosesseringsfabrikk hvor over 100 arbeidere fra ulike land jobber i sesongen. Kvalitet og produktsikkerhet er hans hovedprioritet. Nylig skjedde en kostbar hendelse: En polsk arbeider misforsto instruksjoner om temperaturkontroll for fersk laks og lot et helt parti ligge utenfor kjølekjeden i flere timer. Resultatet var ødeleggelse av 2 tonn fisk til en verdi av 400 000 kroner. Misforståelser av sanitærnormer eller prosedyrer for håndtering av råvarer kan føre til ødeleggelse av hele partier, produktansvarssaker og tap av viktige kunder som Rema 1000 og Coop.' :
                     language === 'uk' ?
                      'Ларс керує великою рибопереробною фабрикою, де в сезон працює понад 100 робітників з різних країн. Якість та безпека продукції – його головний пріоритет. Нещодавно стався дорогий інцидент: польський робітник неправильно зрозумів інструкції щодо температурного контролю свіжого лосося і залишив цілу партію поза холодильною системою на кілька годин. Результат – знищення 2 тонн риби вартістю 400 000 крон. Неправильне розуміння санітарних норм може призвести до псування цілих партій, судових справ та втрати важливих клієнтів як Rema 1000 і Coop.' :
                      'Lars manages a large fish processing factory where over 100 workers from different countries work during the season. Quality and product safety is his main priority. Recently a costly incident occurred: A Polish worker misunderstood temperature control instructions for fresh salmon and left an entire batch outside the cold chain for several hours. The result was destruction of 2 tons of fish worth 400,000 kroner. Misunderstandings of sanitary standards can lead to spoilage of entire batches, product liability cases and loss of important customers like Rema 1000 and Coop.'}
                  </p>
                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">
                      {language === 'no' ? 'Elvarika-løsning:' :
                       language === 'uk' ? 'Рішення Elvarika:' :
                       'Elvarika Solution:'}
                    </h4>
                    <p className="text-green-700 leading-relaxed">
                      {language === 'no' ?
                        'Lars tar opp 2-minutters talemelding på telefonen med dagens nøkkelinstruksjoner og laster det opp til Elvarika. Systemet gjenkjenner språket, identifiserer termer og oversetter dem til arbeidernes morsmål. Polske arbeidere hører nå på polsk: "Fersk laks må holdes konstant mellom 0-2 grader. Sjekk temperatur hver time. Hvis temperaturen stiger over 4 grader, varsle supervisor umiddelbart." Før arbeidsdagen starter, får hver arbeider tilgang til dagens instruksjoner på sitt eget språk, med fokus på kritiske temperatur-, hygiene- og kvalitetsprosedyrer. Systemet vektlegger automatisk de mest kritiske sikkerhetsmessige ordene.' :
                       language === 'uk' ?
                        'Ларс просто записує на телефон 2-хвилинне голосове повідомлення з ключовими інструкціями дня і завантажує його в Elvarika. Система розпізнає мову, виділяє терміни, перекладає та озвучує їх на рідні мови працівників. Польські робітники тепер чують польською: "Свіжий лосось повинен постійно зберігатися при температурі 0-2 градуси. Перевіряйте температуру щогодини. Якщо температура піднімається вище 4 градусів, негайно повідомте супервайзера." Перед початком робочого дня кожен працівник отримує доступ до денних інструкцій своєю мовою з акцентом на критичних процедурах температури, гігієни та якості.' :
                        'Lars records a 2-minute voice message on his phone with the day\'s key instructions and uploads it to Elvarika. The system recognizes the language, identifies terms and translates them into workers\' native languages. Polish workers now hear in Polish: "Fresh salmon must be kept constantly between 0-2 degrees. Check temperature every hour. If temperature rises above 4 degrees, notify supervisor immediately." Before the workday begins, each worker gets access to daily instructions in their own language, focusing on critical temperature, hygiene and quality procedures.'}
                    </p>
                  </div>
                  <div className="bg-green-100 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-[#022f36] mb-3">
                      {language === 'no' ? 'Resultat for investorer:' :
                       language === 'uk' ? 'Результат для інвесторів:' :
                       'Result for Investors:'}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {language === 'no' ?
                        'For agro- og fiskerisektoren, hvor arbeid er sesongbasert og marginer er små, er Elvarika et uunnværlig verktøy for rask distribusjon og opplæring av midlertidige team. Vi tilbyr klienter radikal reduksjon av produktødeleggelsesrisiko, færre tap på grunn av temperaturbrudd og forbedret operasjonell effektivitet i kritiske sesonger. Dette er spesielt verdifullt når en enkelt feil kan koste hundretusenvis av kroner og ødelegge kundeforhold med store kjeder som Norgesgruppen og ICA.' :
                       language === 'uk' ?
                        'Для агросектору та рибальства, де робота має сезонний характер і марже невеликі, Elvarika є незамінним інструментом для швидкого розгортання та навчання тимчасових команд. Ми пропонуємо клієнтам радикальне зниження ризиків псування продукції, менше втрат через порушення температурного режиму та підвищення операційної ефективності в критичні сезони. Це особливо цінно, коли одна помилка може коштувати сотні тисяч крон і зруйнувати відносини з великими мережами як Norgesgruppen та ICA.' :
                        'For the agricultural and fishing sectors, where work is seasonal and margins are small, Elvarika is an indispensable tool for rapid deployment and training of temporary teams. We offer clients radical reduction of product spoilage risk, fewer losses due to temperature violations and improved operational efficiency during critical seasons. This is especially valuable when a single error can cost hundreds of thousands of kroner and destroy customer relationships with major chains like Norgesgruppen and ICA.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#022f36] text-center mb-12 max-w-4xl mx-auto">
            {t.problems.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-red-200 hover:shadow-lg transition-all">
              <CardHeader>
                <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                <CardTitle className="text-xl text-[#022f36]">{t.problems.safety.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.problems.safety.description}</p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-all">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-orange-500 mb-4 transform rotate-180" />
                <CardTitle className="text-xl text-[#022f36]">{t.problems.productivity.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.problems.productivity.description}</p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 hover:shadow-lg transition-all">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-yellow-500 mb-4" />
                <CardTitle className="text-xl text-[#022f36]">{t.problems.costs.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.problems.costs.description}</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-all">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-purple-500 mb-4 transform rotate-180" />
                <CardTitle className="text-xl text-[#022f36]">{t.problems.sales.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.problems.sales.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="demo" className="py-16 bg-gradient-to-br from-[#f8fffe] to-[#f0fff4]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#022f36] text-center mb-12">
            {t.solution.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Upload className="h-10 w-10 text-[#022f36]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#022f36] mb-4">1. {t.solution.step1.title}</h3>
              <p className="text-gray-600 leading-relaxed">{t.solution.step1.description}</p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Brain className="h-10 w-10 text-[#022f36]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#022f36] mb-4">2. {t.solution.step2.title}</h3>
              <p className="text-gray-600 leading-relaxed">{t.solution.step2.description}</p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Headphones className="h-10 w-10 text-[#022f36]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#022f36] mb-4">3. {t.solution.step3.title}</h3>
              <p className="text-gray-600 leading-relaxed">{t.solution.step3.description}</p>
            </div>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#022f36] text-center mb-12 max-w-4xl mx-auto">
            {t.features.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle className="text-xl text-[#022f36]">{t.features.anchor.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.features.anchor.description}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <Repeat className="h-12 w-12 text-green-500 mb-4" />
                <CardTitle className="text-xl text-[#022f36]">{t.features.srs.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.features.srs.description}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <Eye className="h-12 w-12 text-purple-500 mb-4" />
                <CardTitle className="text-xl text-[#022f36]">{t.features.screenFree.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.features.screenFree.description}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-orange-500 mb-4" />
                <CardTitle className="text-xl text-[#022f36]">{t.features.analytics.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.features.analytics.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      

      {/* Social Proof Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#022f36] mb-6">
              {t.socialProof.title}
            </h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {t.socialProof.description}
            </p>
            <div className="bg-gradient-to-br from-[#defff0] to-[#f0fff4] p-8 rounded-lg mb-8">
              <p className="text-lg text-[#022f36] leading-relaxed">
                {t.socialProof.ukrainianSupport}
              </p>
            </div>
            <Button className="bg-[#022f36] text-white hover:bg-[#033944] px-8 py-3 text-lg">
              {t.socialProof.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gradient-to-br from-[#f8fffe] to-[#f0fff4]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#022f36] text-center mb-6">
            {t.pricing.title}
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-4xl mx-auto leading-relaxed">
            {t.pricing.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="text-2xl text-[#022f36]">{t.pricing.team.name}</CardTitle>
                <div className="text-3xl font-bold text-[#022f36]">{t.pricing.team.price}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#022f36] rounded-full"></div>
                    {t.pricing.team.users}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#022f36] rounded-full"></div>
                    {t.pricing.team.credits}
                  </li>
                </ul>
                <p className="text-gray-600 mb-6">{t.pricing.team.description}</p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all border-2 border-[#022f36]">
              <CardHeader>
                <Badge className="bg-[#022f36] text-white mb-2">Mest populær</Badge>
                <CardTitle className="text-2xl text-[#022f36]">{t.pricing.business.name}</CardTitle>
                <div className="text-3xl font-bold text-[#022f36]">{t.pricing.business.price}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#022f36] rounded-full"></div>
                    {t.pricing.business.users}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#022f36] rounded-full"></div>
                    {t.pricing.business.credits}
                  </li>
                </ul>
                <p className="text-gray-600 mb-6">{t.pricing.business.description}</p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="text-2xl text-[#022f36]">{t.pricing.enterprise.name}</CardTitle>
                <div className="text-3xl font-bold text-[#022f36]">{t.pricing.enterprise.price}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#022f36] rounded-full"></div>
                    {t.pricing.enterprise.users}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#022f36] rounded-full"></div>
                    {t.pricing.enterprise.credits}
                  </li>
                </ul>
                <p className="text-gray-600 mb-6">{t.pricing.enterprise.description}</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-[#022f36] text-white hover:bg-[#033944] px-8 py-3 text-lg">
              {t.pricing.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-[#022f36] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t.finalCta.title}
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            {t.finalCta.subtitle}
          </p>
          <Button className="bg-white text-[#022f36] hover:bg-gray-100 px-8 py-3 text-lg">
            {t.finalCta.cta}
          </Button>
        </div>
      </section>



      <Footer />
    </div>
  );
};