import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#022f36] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Lydordbok i Lomma</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Revolusjonerende text-til-tale teknologi som gjør informasjon tilgjengelig 
              for alle. Bygg ditt personlige lydbibliotek med AI-stemmer som låter naturlige.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span className="text-gray-300">kontakt@lydordbok.no</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span className="text-gray-300">+47 123 45 678</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <span className="text-gray-300">Oslo, Norge</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Hurtiglenker</h4>
            <ul className="space-y-3">
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Om teknologien
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Markedsanalyse
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Konkurransefortrinn
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Investor Info */}
          <div>
            <h4 className="font-semibold mb-4">For Investorer</h4>
            <ul className="space-y-3">
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Investordokument
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Finansielle prognoser
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Vekststrategi
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Kontakt team
                </button>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-600 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-300 text-sm">
            © 2025 Lydordbok i Lomma. Alle rettigheter reservert.
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
              <Mail className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-6 text-sm">
            <button className="text-gray-300 hover:text-white transition-colors">
              Personvern
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              Vilkår
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              GDPR
            </button>
          </div>
        </div>

        {/* Investment CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-[#defff0]/20 to-[#7afcd0]/20 rounded-2xl border border-[#defff0]/30">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-3">
              Interessert i investeringsmuligheten?
            </h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Få tilgang til detaljert markedsanalyse og finansielle prognoser for "Lydordbok i Lomma"
            </p>
            <Button className="bg-[#defff0] text-[#022f36] hover:bg-[#7afcd0] font-medium">
              Last ned investordokument
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};