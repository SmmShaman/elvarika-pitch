import React from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Building2, Volume2 } from 'lucide-react';

export const PageNavigation: React.FC = () => {
  const [location] = useLocation();

  const pages = [
    {
      path: '/',
      title: 'Інвестори',
      titleEn: 'Investors',
      description: 'Інвестиційна презентація та демо',
      descriptionEn: 'Investment presentation and demo',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-blue-500',
      audience: 'Для інвесторів'
    },
    {
      path: '/business',
      title: 'Бізнес',
      titleEn: 'Business',
      description: 'B2B рішення для компаній',
      descriptionEn: 'B2B solution for companies',
      icon: <Building2 className="h-5 w-5" />,
      color: 'bg-green-500',
      audience: 'Для бізнесу'
    },
    {
      path: '/pronunciation',
      title: 'Вимова',
      titleEn: 'Pronunciation',
      description: 'Словник з аудіо',
      descriptionEn: 'Audio dictionary',
      icon: <Volume2 className="h-5 w-5" />,
      color: 'bg-purple-500',
      audience: 'Для вивчення'
    }
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg p-4 max-w-xs">
        <h3 className="font-semibold text-sm mb-3 text-gray-800">Навігація по сторінках</h3>
        <div className="space-y-2">
          {pages.map((page) => (
            <Link key={page.path} href={page.path}>
              <Button
                variant={location === page.path ? "default" : "ghost"}
                size="sm"
                className={`w-full justify-start gap-2 text-left h-auto p-3 ${
                  location === page.path ? page.color + ' text-white' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {page.icon}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-xs">{page.title}</span>
                      <Badge variant="outline" className="text-xs">
                        {page.audience}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 truncate mt-1">
                      {page.description}
                    </p>
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Зараз: <span className="font-medium">
              {pages.find(p => p.path === location)?.title || 'Невідома сторінка'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};