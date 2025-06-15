import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
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
import { AnimatedDemo } from '@/components/AnimatedDemo';

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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-[#022f36]">Elvarika</div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#demo" className="text-[#022f36] hover:text-[#033944]">{t.nav.demo}</a>
            <a href="#pricing" className="text-[#022f36] hover:text-[#033944]">{t.nav.pricing}</a>
            <a href="#use-cases" className="text-[#022f36] hover:text-[#033944]">{t.nav.useCase}</a>
            <a href="#about" className="text-[#022f36] hover:text-[#033944]">{t.nav.about}</a>
          </div>
          <LanguageSwitcher currentLanguage={language} onLanguageChange={changeLanguage} />
        </div>
      </nav>

      {/* Hero Section / Demo Section */}
      {!showDemo ? (
        <section className="pt-24 pb-16 bg-gradient-to-br from-[#defff0] to-[#f0fff4] relative overflow-hidden min-h-[600px] flex items-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-[#022f36] mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-xl text-[#022f36] max-w-4xl mx-auto mb-8 leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#022f36] text-white hover:bg-[#033944] px-8 py-3 text-lg">
                {t.hero.ctaPrimary}
              </Button>
              <Button 
                onClick={() => setShowDemo(true)}
                variant="outline" 
                className="border-[#022f36] text-[#022f36] hover:bg-[#022f36] hover:text-white px-8 py-3 text-lg"
              >
                {t.hero.ctaSecondary}
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="pt-24 pb-16 bg-gradient-to-br from-[#defff0] to-[#f0fff4] relative overflow-hidden min-h-[600px]">
          <div className="container mx-auto px-4 h-full">
            <div className="mb-6 text-center">
              <Button 
                onClick={() => setShowDemo(false)}
                variant="outline" 
                className="border-[#022f36] text-[#022f36] hover:bg-[#022f36] hover:text-white"
              >
                ← Назад до головної
              </Button>
            </div>
            <AnimatedDemo />
          </div>
        </section>
      )}

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

      {/* Use Cases Section */}
      <section id="use-cases" className="py-16 bg-gradient-to-br from-[#f8fffe] to-[#f0fff4]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#022f36] text-center mb-12">
            {t.useCases.title}
          </h2>
          <Tabs defaultValue="logistics" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="logistics" className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                {t.useCases.logistics.title}
              </TabsTrigger>
              <TabsTrigger value="manufacturing" className="flex items-center gap-2">
                <HardHat className="h-4 w-4" />
                {t.useCases.manufacturing.title}
              </TabsTrigger>
              <TabsTrigger value="horeca" className="flex items-center gap-2">
                <Coffee className="h-4 w-4" />
                {t.useCases.horeca.title}
              </TabsTrigger>
              <TabsTrigger value="agriculture" className="flex items-center gap-2">
                <Tractor className="h-4 w-4" />
                {t.useCases.agriculture.title}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="logistics">
              <Card className="bg-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-[#022f36] mb-4">{t.useCases.logistics.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{t.useCases.logistics.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manufacturing">
              <Card className="bg-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-[#022f36] mb-4">{t.useCases.manufacturing.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{t.useCases.manufacturing.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="horeca">
              <Card className="bg-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-[#022f36] mb-4">{t.useCases.horeca.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{t.useCases.horeca.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agriculture">
              <Card className="bg-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-[#022f36] mb-4">{t.useCases.agriculture.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{t.useCases.agriculture.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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