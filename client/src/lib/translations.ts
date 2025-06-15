export type Language = 'no' | 'en' | 'uk';

export interface Translations {
  // Navigation
  nav: {
    logo: string;
    demo: string;
    technology: string;
    market: string;
    advantages: string;
    faq: string;
    blog: string;
    investor: string;
  };

  // Hero Section
  hero: {
    title: {
      part1: string;
      part2: string;
      part3: string;
      part4: string;
      part5: string;
      part6: string;
      part7: string;
    };
    subtitle: string;
    cta: string;
  };

  // Audio Player
  audioPlayer: {
    title: string;
    subtitle: string;
    nowPlaying: string;
    speed: string;
    voice: string;
    clickToPlay: string;
    library: string;
  };

  // Bilingual Audio Player
  bilingualPlayer: {
    title: string;
    subtitle: string;
    norwegian: string;
    ukrainian: string;
    urlMissing: string;
    addYouTubeLink: string;
    yourLibrary: string;
    addYouTubeLinks: string;
    activatePlayback: string;
  };

  // Interactive Demo
  interactiveDemo: {
    title: string;
    subtitle: string;
    sampleText: string;
    translateTo: string;
    startDemo: string;
    spanish: string;
  };

  // Tech Showcase
  techShowcase: {
    title: {
      part1: string;
      part2: string;
      part3: string;
    };
    subtitle: string;
    features: {
      neural: {
        title: string;
        description: string;
        details: string;
      };
      realtime: {
        title: string;
        description: string;
        details: string;
      };
      multilingual: {
        title: string;
        description: string;
        details: string;
      };
      privacy: {
        title: string;
        description: string;
        details: string;
      };
    };
    learnMore: string;
    stats: {
      uptime: string;
      processing: string;
      voices: string;
      quality: string;
    };
  };

  // Market Visualization
  market: {
    title: {
      part1: string;
      part2: string;
      part3: string;
    };
    subtitle: string;
    trends: {
      tts: {
        title: string;
        description: string;
        growth: string;
      };
      accessibility: {
        title: string;
        description: string;
        growth: string;
      };
      audiobook: {
        title: string;
        description: string;
        growth: string;
      };
      inaccessibility: {
        title: string;
        description: string;
        growth: string;
      };
    };
    legend: {
      tts: string;
      accessibility: string;
      audioFirst: string;
    };
  };

  // Competitive Advantage
  competitive: {
    title: {
      part1: string;
      part2: string;
      part3: string;
    };
    subtitle: string;
    features: {
      hyperrealistic: string;
      personalLibrary: string;
      playlist: string;
      norwegianOptimized: string;
      gdprCompliant: string;
      offline: string;
      realtime: string;
      accessibilityFocus: string;
    };
    competitors: {
      us: string;
      naturalReader: string;
      speechify: string;
      voiceDream: string;
    };
    stats: {
      fullFeatures: {
        value: string;
        label: string;
        description: string;
      };
      comprehensive: {
        value: string;
        label: string;
        description: string;
      };
      first: {
        value: string;
        label: string;
        description: string;
      };
    };
  };

  // Statistics Section
  statistics: {
    title: {
      part1: string;
      part2: string;
      part3: string;
      part4: string;
    };
    subtitle: string;
    cards: {
      marketSize: {
        title: string;
        description: string;
      };
      underserved: {
        title: string;
        description: string;
      };
      audiobookGrowth: {
        title: string;
        description: string;
      };
      inaccessible: {
        title: string;
        description: string;
      };
    };
  };

  // FAQ Section
  faq: {
    title: string;
    items: {
      what: {
        question: string;
        answer: string;
      };
      audience: {
        question: string;
        answer: string;
      };
      unique: {
        question: string;
        answer: string;
      };
      investment: {
        question: string;
        answer: string;
      };
    };
  };

  // Investor CTA
  investorCTA: {
    title: {
      part1: string;
      part2: string;
      part3: string;
    };
    subtitle: string;
    stats: {
      market: string;
      growth: string;
      users: string;
    };
    cta: string;
    description: string;
  };

  // Footer
  footer: {
    description: string;
    contact: {
      email: string;
      phone: string;
      location: string;
    };
    quickLinks: {
      title: string;
      technology: string;
      marketAnalysis: string;
      advantages: string;
      faq: string;
    };
    investor: {
      title: string;
      document: string;
      forecasts: string;
      strategy: string;
      contact: string;
    };
    copyright: string;
    legal: {
      privacy: string;
      terms: string;
      gdpr: string;
    };
    investorCTA: {
      title: string;
      description: string;
      button: string;
    };
  };

  // Sample playlist items
  playlist: {
    items: {
      analysis: string;
      article: string;
      email: string;
      chapter: string;
    };
    sources: {
      pdf: string;
      webArticle: string;
      email: string;
      textbook: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  no: {
    nav: {
      logo: "Elvarika",
      demo: "Demo",
      technology: "Teknologi",
      market: "Marked",
      advantages: "Fortrinn",
      faq: "FAQ",
      blog: "Blogg",
      investor: "Investormulighet"
    },
    hero: {
      title: {
        part1: "Din ",
        part2: "lydordbok",
        part3: " i ",
        part4: "lomma",
        part5: " - fremtidens måte å ",
        part6: "lytte",
        part7: " til informasjon"
      },
      subtitle: "Bygg ditt personlige lydbibliotek fra enhver tekst. Med AI-stemmer som låter naturlige, kan du nå lytte til artikler, dokumenter og e-post mens du er på farten.",
      cta: "Se investormulighet"
    },
    audioPlayer: {
      title: "Se hvordan",
      subtitle: "Bygg ditt personlige lydbibliotek fra enhver tekst. Last opp dokumenter, artikler eller e-post og få dem omgjort til høykvalitets lyd med naturlige AI-stemmer.",
      nowPlaying: "Spiller nå",
      speed: "Hastighet:",
      voice: "Stemme:",
      clickToPlay: "Klikk play for å høre kvaliteten på våre AI-stemmer",
      library: "Ditt lydbibliotek"
    },
    bilingualPlayer: {
      title: "Se hvordan \"Elvarika\" fungerer i praksis",
      subtitle: "Bygg ditt personlige lydbibliotek fra enhver tekst. Hvert dokument er tilgjengelig på både ukrainsk og norsk.",
      norwegian: "Norsk",
      ukrainian: "Українська", 
      urlMissing: "YouTube URL mangler for norsk versjon",
      addYouTubeLink: "Legg til YouTube-lenke for å spille av dette dokumentet",
      yourLibrary: "Ditt lydbibliotek",
      addYouTubeLinks: "Legg til dine YouTube-lenker",
      activatePlayback: "For å aktivere avspilling, legg til YouTube-lenker for hvert dokument i både norsk og ukrainsk versjon."
    },
    interactiveDemo: {
      title: "Interactive Demo - Se Elvarika i aksjon",
      subtitle: "Opplev vår 4-trinns transformasjonsprosess: Fra tekst til organisert lydspilleliste på sekunder.",
      sampleText: "Kunstig intelligens revolusjonerer måten vi jobber på. Maskinlæring gjør det mulig for datamaskiner å lære av data uten eksplisitt programmering. Nevrale nettverk etterligner hjernens struktur for å løse komplekse problemer. Automatisering reduserer behovet for manuelt arbeid og øker effektiviteten.",
      translateTo: "Oversett til:",
      startDemo: "Start interaktiv demo",
      spanish: "Spansk"
    },
    techShowcase: {
      title: {
        part1: "Banebrytende",
        part2: " teknologi som ",
        part3: "definerer fremtiden"
      },
      subtitle: "Våre teknologiske innovasjoner setter ny standard for text-til-tale kvalitet og brukeropplevelse.",
      features: {
        neural: {
          title: "Neural TTS Teknologi",
          description: "Hyperrealistiske AI-stemmer som låter naturlige",
          details: "Våre avanserte nevrale nettverk produserer tale som er nesten umulig å skille fra ekte menneskestemmer. Med emosjonell resonans og naturlig intonasjon."
        },
        realtime: {
          title: "Sanntids Konvertering",
          description: "Øyeblikkelig tekst-til-tale prosessering",
          details: "Avansert prosessering som konverterer store tekstmengder til høykvalitets lyd på sekunder, ikke minutter."
        },
        multilingual: {
          title: "Flerspråklig Støtte",
          description: "Støtter norsk og andre nordiske språk",
          details: "Spesialisert på nordiske språk med kulturell nøyaktighet og riktig uttale av lokale navn og uttrykk."
        },
        privacy: {
          title: "Personvern & Sikkerhet",
          description: "GDPR-kompatibel med lokal prosessering",
          details: "All tekstbehandling skjer sikkert med full kontroll over dine data. Ingen tekst lagres unødvendig eller deles med tredjeparter."
        }
      },
      learnMore: "Lær mer om teknologien",
      stats: {
        uptime: "Oppetid",
        processing: "Prosesseringstid",
        voices: "Stemmetyper",
        quality: "Kvalitetsvurdering"
      }
    },
    market: {
      title: {
        part1: "Markedets",
        part2: " konvergens skaper ",
        part3: "unik mulighet"
      },
      subtitle: "Tre kraftige markedstrender møtes og skaper en perfekt storm for Elvarika sin posisjonering i et multi-milliard dollar marked.",
      trends: {
        tts: {
          title: "Text-to-Speech Marked",
          description: "Forventet markedsstørrelse innen 2032 drevet av AI-fremskritt og økende etterspørsel",
          growth: "+30.20% CAGR"
        },
        accessibility: {
          title: "Tilgjengelighetsbehov",
          description: "Mennesker med funksjonshemming som mangler tilgjengelige digitale løsninger",
          growth: "Underservert"
        },
        audiobook: {
          title: "Lydbok Revolusjon",
          description: "Lydbokmarkedet vokser eksplosivt med endrede forbrukervaner mot lyd-først innhold",
          growth: "+26.5% CAGR"
        },
        inaccessibility: {
          title: "Digital Utilgjengelighet",
          description: "Av verdens nettsider oppfyller ikke grunnleggende tilgjengelighetsstandarder",
          growth: "Markedsmulighet"
        }
      },
      legend: {
        tts: "TTS Teknologi",
        accessibility: "Tilgjengelighet",
        audioFirst: "Audio-First"
      }
    },
    competitive: {
      title: {
        part1: "Konkurransefortrinn",
        part2: " som ",
        part3: "definerer markedsledelse"
      },
      subtitle: "Mens konkurrentene fokuserer på enkeltfunksjoner, leverer vi en helhetlig lydopplevelse som setter ny standard i bransjen.",
      features: {
        hyperrealistic: "Hyperrealistiske AI-stemmer",
        personalLibrary: "Personlig lydbibliotek",
        playlist: "Spilleliste-funksjonalitet",
        norwegianOptimized: "Norsk språkoptimalisering",
        gdprCompliant: "GDPR-kompatibel",
        offline: "Offline-funksjonalitet",
        realtime: "Sanntids prosessering",
        accessibilityFocus: "Tilgjengelighetsfokus"
      },
      competitors: {
        us: "Elvarika",
        naturalReader: "NaturalReader",
        speechify: "Speechify",
        voiceDream: "Voice Dream"
      },
      stats: {
        fullFeatures: {
          value: "8/8",
          label: "Fulle funksjoner",
          description: "Som eneste løsning med alle nøkkelfunksjoner"
        },
        comprehensive: {
          value: "3x",
          label: "Mer omfattende",
          description: "Enn nærmeste konkurrent i funksjonalitet"
        },
        first: {
          value: "1st",
          label: "Lydbibliotek-konsept",
          description: "Første til å introdusere spilleliste-funksjon"
        }
      }
    },
    statistics: {
      title: {
        part1: "Revolusjonerende",
        part2: " text-til-tale teknologi som",
        part3: " gjør informasjon tilgjengelig ",
        part4: "for alle, overalt."
      },
      subtitle: "Over 1 milliard mennesker lever med funksjonshemming, og 96% av nettsider oppfyller ikke grunnleggende tilgjengelighetsstandarder. Elvarika møter dette behovet med AI-stemmer så naturlige at de er nesten umulige å skille fra ekte stemmer.",
      cards: {
        marketSize: {
          title: "Markedsstørrelse 2032.",
          description: "Text-til-tale markedet vokser med 30.20% årlig og når 75 milliarder dollar innen 2032."
        },
        underserved: {
          title: "Underservert marked.",
          description: "Over 1 milliard mennesker med funksjonshemming mangler tilgjengelige digitale løsninger."
        },
        audiobookGrowth: {
          title: "Lydbok-vekst årlig.",
          description: "Lydbokmarkedet vokser kraftig og viser klart skifte mot lydbasert innhold."
        },
        inaccessible: {
          title: "Nettsider ikke tilgjengelige.",
          description: "Nesten alle nettsider oppfyller ikke grunnleggende tilgjengelighetsstandarder."
        }
      }
    },
    faq: {
      title: "FAQs",
      items: {
        what: {
          question: "Hva er Elvarika?",
          answer: "Elvarika er en revolusjonerende text-til-tale applikasjon som lar deg bygge ditt personlige lydbibliotek fra enhver tekst. Med AI-stemmer som låter naturlige kan du lytte til artikler, dokumenter, e-post og annet innhold mens du er på farten."
        },
        audience: {
          question: "Hvem er målgruppen for denne teknologien?",
          answer: "Primært studenter, profesjonelle og personer med dysleksi eller synshemming. Også investorer som ser potensialet i det raskt voksende text-til-tale markedet som forventes å nå 75 milliarder dollar innen 2032."
        },
        unique: {
          question: "Hva gjør denne løsningen unik?",
          answer: "Vi kombinerer hyperrealistiske AI-stemmer med en intuitiv spilleliste-funksjon som gjør tekstkonvertering til en sømløs opplevelse. Brukere kan organisere sitt innhold som en personlig Spotify for tekst."
        },
        investment: {
          question: "Hva er investeringsmulighetene?",
          answer: "Med tre kraftige markedstrender - TTS-teknologi som vokser 30% årlig, over 1 milliard underserverte brukere med tilgjengelighetsbehov, og lydbokmarkedet som vokser 26.5% - posisjonerer vi oss i skjæringspunktet av flere milliard-dollar markeder."
        }
      }
    },
    investorCTA: {
      title: {
        part1: "Investeringsmulighet",
        part2: " i fremtidens ",
        part3: "lydteknologi"
      },
      subtitle: "Elvarika posisjonerer seg i skjæringspunktet av tre milliard-dollar markeder: Text-til-tale teknologi, digital tilgjengelighet og audio-first innhold.",
      stats: {
        market: "TTS marked 2032",
        growth: "Årlig vekst",
        users: "Underserverte brukere"
      },
      cta: "Last ned investordokument",
      description: "Få tilgang til detaljert markedsanalyse, finansielle prognoser og vekststrategi"
    },
    footer: {
      description: "Revolusjonerende text-til-tale teknologi som gjør informasjon tilgjengelig for alle. Bygg ditt personlige lydbibliotek med AI-stemmer som låter naturlige.",
      contact: {
        email: "info@vitalii.no",
        phone: "+47 925 64 334",
        location: "Hagegata 8, Lena, 2850, Norge"
      },
      quickLinks: {
        title: "Hurtiglenker",
        technology: "Om teknologien",
        marketAnalysis: "Markedsanalyse",
        advantages: "Konkurransefortrinn",
        faq: "FAQ"
      },
      investor: {
        title: "For Investorer",
        document: "Investordokument",
        forecasts: "Finansielle prognoser",
        strategy: "Vekststrategi",
        contact: "Kontakt team"
      },
      copyright: "© 2025 Elvarika. Alle rettigheter reservert.",
      legal: {
        privacy: "Personvern",
        terms: "Vilkår",
        gdpr: "GDPR"
      },
      investorCTA: {
        title: "Interessert i investeringsmuligheten?",
        description: "Få tilgang til detaljert markedsanalyse og finansielle prognoser for Elvarika",
        button: "Last ned investordokument"
      }
    },
    playlist: {
      items: {
        analysis: "Q3 Markedsanalyse.pdf",
        article: "Fremtidens AI-teknologi",
        email: "E-post fra CEO",
        chapter: "Kapittel 5: Mikroøkonomi"
      },
      sources: {
        pdf: "PDF Dokument",
        webArticle: "Nettartikkel",
        email: "E-post",
        textbook: "Lærebok"
      }
    }
  },
  en: {
    nav: {
      logo: "Elvarika",
      demo: "Demo",
      technology: "Technology",
      market: "Market",
      advantages: "Advantages",
      faq: "FAQ",
      blog: "Blog",
      investor: "Investment Opportunity"
    },
    hero: {
      title: {
        part1: "Your ",
        part2: "audio dictionary",
        part3: " in your ",
        part4: "pocket",
        part5: " - the future way to ",
        part6: "listen",
        part7: " to information"
      },
      subtitle: "Build your personal audio library from any text. With AI voices that sound natural, you can now listen to articles, documents and emails while on the go.",
      cta: "View Investment Opportunity"
    },
    audioPlayer: {
      title: "See how",
      subtitle: "Build your personal audio library from any text. Upload documents, articles or emails and get them converted to high-quality audio with natural AI voices.",
      nowPlaying: "Now Playing",
      speed: "Speed:",
      voice: "Voice:",
      clickToPlay: "Click play to hear the quality of our AI voices",
      library: "Your Audio Library"
    },
    bilingualPlayer: {
      title: "See how \"Elvarika\" works in practice",
      subtitle: "Build your personal audio library from any text. Each document is available in both Ukrainian and Norwegian.",
      norwegian: "Norwegian",
      ukrainian: "Українська", 
      urlMissing: "YouTube URL missing for Norwegian version",
      addYouTubeLink: "Add YouTube link to play this document",
      yourLibrary: "Your Audio Library",
      addYouTubeLinks: "Add your YouTube links",
      activatePlayback: "To activate playback, add YouTube links for each document in both Norwegian and Ukrainian versions."
    },
    interactiveDemo: {
      title: "Interactive Demo - See Elvarika in Action",
      subtitle: "Experience our 4-step transformation process: From text to organized audio playlist in seconds.",
      sampleText: "Artificial intelligence is revolutionizing the way we work. Machine learning enables computers to learn from data without explicit programming. Neural networks mimic the brain's structure to solve complex problems. Automation reduces the need for manual labor and increases efficiency.",
      translateTo: "Translate to:",
      startDemo: "Start Interactive Demo",
      spanish: "Spanish"
    },
    techShowcase: {
      title: {
        part1: "Groundbreaking",
        part2: " technology that ",
        part3: "defines the future"
      },
      subtitle: "Our technological innovations set new standards for text-to-speech quality and user experience.",
      features: {
        neural: {
          title: "Neural TTS Technology",
          description: "Hyper-realistic AI voices that sound natural",
          details: "Our advanced neural networks produce speech that is almost impossible to distinguish from real human voices. With emotional resonance and natural intonation."
        },
        realtime: {
          title: "Real-time Conversion",
          description: "Instant text-to-speech processing",
          details: "Advanced processing that converts large amounts of text to high-quality audio in seconds, not minutes."
        },
        multilingual: {
          title: "Multilingual Support",
          description: "Supports Norwegian and other Nordic languages",
          details: "Specialized in Nordic languages with cultural accuracy and correct pronunciation of local names and expressions."
        },
        privacy: {
          title: "Privacy & Security",
          description: "GDPR-compliant with local processing",
          details: "All text processing happens securely with full control over your data. No text is stored unnecessarily or shared with third parties."
        }
      },
      learnMore: "Learn more about the technology",
      stats: {
        uptime: "Uptime",
        processing: "Processing time",
        voices: "Voice types",
        quality: "Quality rating"
      }
    },
    market: {
      title: {
        part1: "Market",
        part2: " convergence creates ",
        part3: "unique opportunity"
      },
      subtitle: "Three powerful market trends meet and create a perfect storm for Elvarika's positioning in a multi-billion dollar market.",
      trends: {
        tts: {
          title: "Text-to-Speech Market",
          description: "Expected market size by 2032 driven by AI advances and increasing demand",
          growth: "+30.20% CAGR"
        },
        accessibility: {
          title: "Accessibility Needs",
          description: "People with disabilities who lack accessible digital solutions",
          growth: "Underserved"
        },
        audiobook: {
          title: "Audiobook Revolution",
          description: "Audiobook market growing explosively with changing consumer habits toward audio-first content",
          growth: "+26.5% CAGR"
        },
        inaccessibility: {
          title: "Digital Inaccessibility",
          description: "Of the world's websites do not meet basic accessibility standards",
          growth: "Market opportunity"
        }
      },
      legend: {
        tts: "TTS Technology",
        accessibility: "Accessibility",
        audioFirst: "Audio-First"
      }
    },
    competitive: {
      title: {
        part1: "Competitive advantages",
        part2: " that ",
        part3: "define market leadership"
      },
      subtitle: "While competitors focus on individual features, we deliver a comprehensive audio experience that sets new industry standards.",
      features: {
        hyperrealistic: "Hyper-realistic AI voices",
        personalLibrary: "Personal audio library",
        playlist: "Playlist functionality",
        norwegianOptimized: "Norwegian language optimization",
        gdprCompliant: "GDPR-compliant",
        offline: "Offline functionality",
        realtime: "Real-time processing",
        accessibilityFocus: "Accessibility focus"
      },
      competitors: {
        us: "Elvarika",
        naturalReader: "NaturalReader",
        speechify: "Speechify",
        voiceDream: "Voice Dream"
      },
      stats: {
        fullFeatures: {
          value: "8/8",
          label: "Full features",
          description: "As the only solution with all key features"
        },
        comprehensive: {
          value: "3x",
          label: "More comprehensive",
          description: "Than the nearest competitor in functionality"
        },
        first: {
          value: "1st",
          label: "Audio library concept",
          description: "First to introduce playlist functionality"
        }
      }
    },
    statistics: {
      title: {
        part1: "Revolutionary",
        part2: " text-to-speech technology that",
        part3: " makes information accessible ",
        part4: "to everyone, everywhere."
      },
      subtitle: "Over 1 billion people live with disabilities, and 96% of websites do not meet basic accessibility standards. Elvarika meets this need with AI voices so natural they are almost impossible to distinguish from real voices.",
      cards: {
        marketSize: {
          title: "Market size 2032.",
          description: "Text-to-speech market grows 30.20% annually and reaches 75 billion dollars by 2032."
        },
        underserved: {
          title: "Underserved market.",
          description: "Over 1 billion people with disabilities lack accessible digital solutions."
        },
        audiobookGrowth: {
          title: "Audiobook growth annually.",
          description: "Audiobook market grows strongly and shows clear shift toward audio-based content."
        },
        inaccessible: {
          title: "Websites not accessible.",
          description: "Almost all websites do not meet basic accessibility standards."
        }
      }
    },
    faq: {
      title: "FAQs",
      items: {
        what: {
          question: "What is Elvarika?",
          answer: "Elvarika is a revolutionary text-to-speech application that lets you build your personal audio library from any text. With AI voices that sound natural, you can listen to articles, documents, emails and other content while on the go."
        },
        audience: {
          question: "Who is the target audience for this technology?",
          answer: "Primarily students, professionals and people with dyslexia or visual impairment. Also investors who see the potential in the rapidly growing text-to-speech market expected to reach 75 billion dollars by 2032."
        },
        unique: {
          question: "What makes this solution unique?",
          answer: "We combine hyper-realistic AI voices with an intuitive playlist function that makes text conversion a seamless experience. Users can organize their content like a personal Spotify for text."
        },
        investment: {
          question: "What are the investment opportunities?",
          answer: "With three powerful market trends - TTS technology growing 30% annually, over 1 billion underserved users with accessibility needs, and the audiobook market growing 26.5% - we position ourselves at the intersection of several billion-dollar markets."
        }
      }
    },
    investorCTA: {
      title: {
        part1: "Investment opportunity",
        part2: " in future ",
        part3: "audio technology"
      },
      subtitle: "Elvarika positions itself at the intersection of three billion-dollar markets: Text-to-speech technology, digital accessibility and audio-first content.",
      stats: {
        market: "TTS market 2032",
        growth: "Annual growth",
        users: "Underserved users"
      },
      cta: "Download investor document",
      description: "Get access to detailed market analysis, financial forecasts and growth strategy"
    },
    footer: {
      description: "Revolutionary text-to-speech technology that makes information accessible to everyone. Build your personal audio library with AI voices that sound natural.",
      contact: {
        email: "info@vitalii.no",
        phone: "+47 925 64 334",
        location: "Hagegata 8, Lena, 2850, Norge"
      },
      quickLinks: {
        title: "Quick Links",
        technology: "About technology",
        marketAnalysis: "Market analysis",
        advantages: "Competitive advantages",
        faq: "FAQ"
      },
      investor: {
        title: "For Investors",
        document: "Investor document",
        forecasts: "Financial forecasts",
        strategy: "Growth strategy",
        contact: "Contact team"
      },
      copyright: "© 2025 Elvarika. All rights reserved.",
      legal: {
        privacy: "Privacy",
        terms: "Terms",
        gdpr: "GDPR"
      },
      investorCTA: {
        title: "Interested in the investment opportunity?",
        description: "Get access to detailed market analysis and financial forecasts for Elvarika",
        button: "Download investor document"
      }
    },
    playlist: {
      items: {
        analysis: "Q3 Market Analysis.pdf",
        article: "The Future of AI Technology",
        email: "Email from CEO",
        chapter: "Chapter 5: Microeconomics"
      },
      sources: {
        pdf: "PDF Document",
        webArticle: "Web Article",
        email: "Email",
        textbook: "Textbook"
      }
    }
  },
  uk: {
    nav: {
      logo: "Elvarika",
      demo: "Демо",
      technology: "Технології",
      market: "Ринок",
      advantages: "Переваги",
      faq: "FAQ",
      blog: "Блог",
      investor: "Інвестиційна можливість"
    },
    hero: {
      title: {
        part1: "Ваш ",
        part2: "аудіо словник",
        part3: " у вашій ",
        part4: "кишені",
        part5: " - майбутній спосіб ",
        part6: "слухати",
        part7: " інформацію"
      },
      subtitle: "Створюйте персональну аудіо бібліотеку з будь-якого тексту. З ІІ-голосами, що звучать природно, ви можете слухати статті, документи та електронні листи на ходу.",
      cta: "Переглянути інвестиційну можливість"
    },
    audioPlayer: {
      title: "Подивіться як",
      subtitle: "Створюйте персональну аудіо бібліотеку з будь-якого тексту. Завантажуйте документи, статті або електронні листи та перетворюйте їх на високоякісний звук з природними ІІ-голосами.",
      nowPlaying: "Зараз грає",
      speed: "Швидкість:",
      voice: "Голос:",
      clickToPlay: "Натисніть play, щоб почути якість наших ІІ-голосів",
      library: "Ваша аудіо бібліотека"
    },
    bilingualPlayer: {
      title: "Подивіться як \"Elvarika\" працює на практиці",
      subtitle: "Створюйте персональну аудіо бібліотеку з будь-якого тексту. Кожен документ доступний українською та норвезькою мовами.",
      norwegian: "Норвезька",
      ukrainian: "Українська", 
      urlMissing: "YouTube URL відсутня для норвезької версії",
      addYouTubeLink: "Додайте YouTube посилання для відтворення цього документа",
      yourLibrary: "Ваша аудіо бібліотека",
      addYouTubeLinks: "Додайте ваші YouTube посилання",
      activatePlayback: "Для активації відтворення додайте YouTube посилання для кожного документа українською та норвезькою мовами."
    },
    interactiveDemo: {
      title: "Інтерактивне демо - Подивіться Elvarika в дії",
      subtitle: "Відчуйте наш 4-крокований процес трансформації: Від тексту до організованого аудіо плейлиста за секунди.",
      sampleText: "Штучний інтелект революціонізує спосіб нашої роботи. Машинне навчання дозволяє комп'ютерам вчитися з даних без явного програмування. Нейронні мережі імітують структуру мозку для вирішення складних проблем. Автоматизація зменшує потребу в ручній праці та підвищує ефективність.",
      translateTo: "Перекласти на:",
      startDemo: "Почати інтерактивне демо",
      spanish: "Іспанська"
    },
    techShowcase: {
      title: {
        part1: "Революційні",
        part2: " технології, що ",
        part3: "визначають майбутнє"
      },
      subtitle: "Наші технологічні інновації встановлюють нові стандарти якості text-to-speech та користувацького досвіду.",
      features: {
        neural: {
          title: "Нейронна TTS Технологія",
          description: "Гіперреалістичні ІІ-голоси, що звучать природно",
          details: "Наші передові нейронні мережі виробляють мовлення, яке майже неможливо відрізнити від справжніх людських голосів. З емоційним резонансом та природною інтонацією."
        },
        realtime: {
          title: "Конвертація в реальному часі",
          description: "Миттєва обробка text-to-speech",
          details: "Передова обробка, що перетворює великі обсяги тексту на високоякісний звук за секунди, а не хвилини."
        },
        multilingual: {
          title: "Багатомовна підтримка",
          description: "Підтримує норвезьку та інші північні мови",
          details: "Спеціалізація на північних мовах з культурною точністю та правильною вимовою місцевих назв та виразів."
        },
        privacy: {
          title: "Конфіденційність і безпека",
          description: "GDPR-сумісність з локальною обробкою",
          details: "Вся обробка тексту відбувається безпечно з повним контролем над вашими даними. Жоден текст не зберігається непотрібно або не передається третім особам."
        }
      },
      learnMore: "Дізнатися більше про технологію",
      stats: {
        uptime: "Час роботи",
        processing: "Час обробки",
        voices: "Типи голосів",
        quality: "Оцінка якості"
      }
    },
    market: {
      title: {
        part1: "Конвергенція ринку",
        part2: " створює ",
        part3: "унікальну можливість"
      },
      subtitle: "Три потужні ринкові тенденції зустрічаються і створюють ідеальний шторм для позиціонування Elvarika на багатомільярдному ринку.",
      trends: {
        tts: {
          title: "Ринок Text-to-Speech",
          description: "Очікуваний розмір ринку до 2032 року, обумовлений прогресом ІІ та зростаючим попитом",
          growth: "+30.20% CAGR"
        },
        accessibility: {
          title: "Потреби доступності",
          description: "Люди з інвалідністю, які не мають доступних цифрових рішень",
          growth: "Недообслуговувані"
        },
        audiobook: {
          title: "Революція аудіокниг",
          description: "Ринок аудіокниг зростає вибухово зі зміною споживчих звичок до аудіо-контенту",
          growth: "+26.5% CAGR"
        },
        inaccessibility: {
          title: "Цифрова недоступність",
          description: "Веб-сайтів світу не відповідають базовим стандартам доступності",
          growth: "Ринкова можливість"
        }
      },
      legend: {
        tts: "TTS Технології",
        accessibility: "Доступність",
        audioFirst: "Аудіо-перший"
      }
    },
    competitive: {
      title: {
        part1: "Конкурентні переваги",
        part2: ", що ",
        part3: "визначають ринкове лідерство"
      },
      subtitle: "Поки конкуренти зосереджуються на окремих функціях, ми надаємо всебічний аудіо досвід, що встановлює нові галузеві стандарти.",
      features: {
        hyperrealistic: "Гіперреалістичні ІІ-голоси",
        personalLibrary: "Персональна аудіо бібліотека",
        playlist: "Функціональність плейлиста",
        norwegianOptimized: "Оптимізація норвезької мови",
        gdprCompliant: "GDPR-сумісний",
        offline: "Офлайн функціональність",
        realtime: "Обробка в реальному часі",
        accessibilityFocus: "Фокус на доступності"
      },
      competitors: {
        us: "Elvarika",
        naturalReader: "NaturalReader",
        speechify: "Speechify",
        voiceDream: "Voice Dream"
      },
      stats: {
        fullFeatures: {
          value: "8/8",
          label: "Повні функції",
          description: "Як єдине рішення з усіма ключовими функціями"
        },
        comprehensive: {
          value: "3x",
          label: "Більш всебічний",
          description: "Ніж найближчий конкурент за функціональністю"
        },
        first: {
          value: "1-й",
          label: "Концепція аудіо бібліотеки",
          description: "Перший у впровадженні функціональності плейлиста"
        }
      }
    },
    statistics: {
      title: {
        part1: "Революційна",
        part2: " text-to-speech технологія, що",
        part3: " робить інформацію доступною ",
        part4: "для всіх, скрізь."
      },
      subtitle: "Понад 1 мільярд людей живуть з інвалідністю, і 96% веб-сайтів не відповідають базовим стандартам доступності. Elvarika задовольняє цю потребу ІІ-голосами настільки природними, що їх майже неможливо відрізнити від справжніх голосів.",
      cards: {
        marketSize: {
          title: "Розмір ринку 2032.",
          description: "Text-to-speech ринок зростає на 30.20% щорічно і досягає 75 мільярдів доларів до 2032 року."
        },
        underserved: {
          title: "Недообслуговуваний ринок.",
          description: "Понад 1 мільярд людей з інвалідністю не мають доступних цифрових рішень."
        },
        audiobookGrowth: {
          title: "Зростання аудіокниг щорічно.",
          description: "Ринок аудіокниг зростає сильно і показує чіткий зсув до аудіо-контенту."
        },
        inaccessible: {
          title: "Веб-сайти недоступні.",
          description: "Майже всі веб-сайти не відповідають базовим стандартам доступності."
        }
      }
    },
    faq: {
      title: "FAQ",
      items: {
        what: {
          question: "Що таке Elvarika?",
          answer: "Elvarika - це революційний додаток text-to-speech, який дозволяє створювати персональну аудіо бібліотеку з будь-якого тексту. З ІІ-голосами, що звучать природно, ви можете слухати статті, документи, електронні листи та інший контент на ходу."
        },
        audience: {
          question: "Хто є цільовою аудиторією для цієї технології?",
          answer: "Передусім студенти, професіонали та люди з дислексією або порушеннями зору. Також інвестори, які бачать потенціал у швидкозростаючому ринку text-to-speech, який очікується досягне 75 мільярдів доларів до 2032 року."
        },
        unique: {
          question: "Що робить це рішення унікальним?",
          answer: "Ми поєднуємо гіперреалістичні ІІ-голоси з інтуїтивною функцією плейлиста, що робить конвертацію тексту безшовним досвідом. Користувачі можуть організовувати свій контент як персональний Spotify для тексту."
        },
        investment: {
          question: "Які інвестиційні можливості?",
          answer: "З трьома потужними ринковими тенденціями - TTS технології, що зростають на 30% щорічно, понад 1 мільярдом недообслуговуваних користувачів з потребами доступності, та ринком аудіокниг, що зростає на 26.5% - ми позиціонуємося на перетині кількох багатомільярдних ринків."
        }
      }
    },
    investorCTA: {
      title: {
        part1: "Інвестиційна можливість",
        part2: " у майбутні ",
        part3: "аудіо технології"
      },
      subtitle: "Elvarika позиціонується на перетині трьох багатомільярдних ринків: Text-to-speech технології, цифрової доступності та аудіо-контенту.",
      stats: {
        market: "TTS ринок 2032",
        growth: "Щорічне зростання",
        users: "Недообслуговувані користувачі"
      },
      cta: "Завантажити інвестиційний документ",
      description: "Отримайте доступ до детального аналізу ринку, фінансових прогнозів та стратегії зростання"
    },
    footer: {
      description: "Революційна text-to-speech технологія, що робить інформацію доступною для всіх. Створюйте персональну аудіо бібліотеку з ІІ-голосами, що звучать природно.",
      contact: {
        email: "info@vitalii.no",
        phone: "+47 925 64 334",
        location: "Hagegata 8, Lena, 2850, Norge"
      },
      quickLinks: {
        title: "Швидкі посилання",
        technology: "Про технологію",
        marketAnalysis: "Аналіз ринку",
        advantages: "Конкурентні переваги",
        faq: "FAQ"
      },
      investor: {
        title: "Для інвесторів",
        document: "Інвестиційний документ",
        forecasts: "Фінансові прогнози",
        strategy: "Стратегія зростання",
        contact: "Зв'язатися з командою"
      },
      copyright: "© 2025 Elvarika. Всі права захищені.",
      legal: {
        privacy: "Конфіденційність",
        terms: "Умови",
        gdpr: "GDPR"
      },
      investorCTA: {
        title: "Зацікавлені в інвестиційній можливості?",
        description: "Отримайте доступ до детального аналізу ринку та фінансових прогнозів для Elvarika",
        button: "Завантажити інвестиційний документ"
      }
    },
    playlist: {
      items: {
        analysis: "Q3 Аналіз ринку.pdf",
        article: "Майбутнє ІІ технологій",
        email: "Електронний лист від CEO",
        chapter: "Розділ 5: Мікроекономіка"
      },
      sources: {
        pdf: "PDF Документ",
        webArticle: "Веб стаття",
        email: "Електронний лист",
        textbook: "Підручник"
      }
    }
  }
};

export const getTranslation = (language: Language): Translations => {
  return translations[language] || translations.no;
};