import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { Users, Building2, Volume2, X, HelpCircle } from 'lucide-react';

export const PageGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pages = [
    {
      path: '/',
      title: 'Сторінка для інвесторів',
      titleEn: 'Investor Page',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-blue-500',
      description: 'Презентація проекту для потенційних інвесторів. Включає демо технології, ринковий аналіз, статистику та інвестиційні можливості.',
      features: [
        'Інтерактивне демо text-to-speech',
        'Ринкова аналітика та прогнози',
        'Конкурентні переваги',
        'Статистика та метрики',
        'Інвестиційний CTA'
      ],
      audience: 'Інвестори, партнери, стейкхолдери'
    },
    {
      path: '/business',
      title: 'B2B рішення для бізнесу',
      titleEn: 'B2B Business Solution',
      icon: <Building2 className="h-6 w-6" />,
      color: 'bg-green-500',
      description: 'Комерційне рішення для компаній. Фокус на норвезькій безпеці праці та мовних бар\'єрах у робочому середовищі.',
      features: [
        'Норвезький словник безпеки праці',
        'Двомовні аудіоплейлисти (норвезька → українська/англійська)',
        'Бізнес-кейси та ROI',
        'Корпоративні функції',
        'Демо для B2B клієнтів'
      ],
      audience: 'HR-менеджери, керівники компаній, тренери з безпеки'
    },
    {
      path: '/pronunciation',
      title: 'Вивчення вимови',
      titleEn: 'Pronunciation Learning',
      icon: <Volume2 className="h-6 w-6" />,
      color: 'bg-purple-500',
      description: 'Інтерактивний словник для вивчення норвезької вимови з аудіо прикладами та візуальними підказками.',
      features: [
        'Інтерактивний аудіословник',
        'Норвезька → українська/англійська',
        'Контроль швидкості відтворення',
        'Візуальні темп-індикатори',
        'Завантаження MP3 файлів'
      ],
      audience: 'Студенти, працівники, що вивчають норвезьку'
    }
  ];

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-[#022f36] hover:bg-[#033d46] text-white shadow-lg"
        size="lg"
      >
        <HelpCircle className="h-5 w-5 mr-2" />
        Що це за сторінки?
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-[#022f36]">Навігація по проекту Elvarika</h2>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-6 space-y-6">
          <p className="text-gray-600 text-lg">
            У проекті є три основні сторінки, кожна з яких призначена для різної аудиторії:
          </p>
          
          <div className="grid gap-6">
            {pages.map((page) => (
              <Card key={page.path} className="border-2 hover:shadow-lg transition-all">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className={`${page.color} text-white rounded-lg p-3 flex-shrink-0`}>
                      {page.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-[#022f36] mb-2">
                        {page.title}
                      </CardTitle>
                      <Badge variant="outline" className="mb-3">
                        {page.audience}
                      </Badge>
                      <p className="text-gray-600 leading-relaxed">
                        {page.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-[#022f36] mb-2">Основні функції:</h4>
                    <ul className="space-y-1">
                      {page.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-[#022f36] rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href={page.path}>
                    <Button 
                      className={`${page.color} hover:opacity-90 text-white w-full`}
                      onClick={() => setIsOpen(false)}
                    >
                      Перейти на сторінку
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-[#022f36] mb-2">Поради для навігації:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Використовуйте навігаційну панель у правому верхньому куті для швидкого переключення</li>
              <li>• Кожна сторінка має свою унікальну кольорову схему та функціональність</li>
              <li>• Всі сторінки підтримують три мови: норвезьку, українську та англійську</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};