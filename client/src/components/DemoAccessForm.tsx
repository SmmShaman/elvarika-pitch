import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, Mail, Lock, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface DemoAccessFormProps {
  onAccessGranted: () => void;
  language: 'no' | 'uk' | 'en';
}

export function DemoAccessForm({ onAccessGranted, language }: DemoAccessFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [verificationToken, setVerificationToken] = useState<string>('');
  const [isVerified, setIsVerified] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const { toast } = useToast();

  const texts = {
    no: {
      title: 'Få tilgang til demo',
      subtitle: 'Vennligst fyll ut skjemaet for å få tilgang til den interaktive demonstrasjonen',
      name: 'Navn',
      email: 'E-postadresse',
      message: 'Melding (valgfritt)',
      messagePlaceholder: 'Fortell oss om din bedrift og hvordan Elvarika kan hjelpe...',
      submit: 'Send forespørsel',
      submitting: 'Sender...',
      submitted: 'Forespørsel sendt!',
      verificationSent: 'Vi har sendt en bekreftelseslenke til din e-post. Klikk på lenken for å få tilgang til demoen.',
      verify: 'Bekreft e-post',
      verifying: 'Bekrefter...',
      verified: 'E-post bekreftet! Du har nå tilgang til demoen.',
      accessDemo: 'Åpne demo',
      demoNote: 'For demonstrasjonsformål vises verifikasjonstokenet nedenfor. I produksjon sendes dette via e-post.',
    },
    uk: {
      title: 'Отримати доступ до демо',
      subtitle: 'Будь ласка, заповніть форму для отримання доступу до інтерактивної демонстрації',
      name: 'Ім\'я',
      email: 'Електронна пошта',
      message: 'Повідомлення (опціонально)',
      messagePlaceholder: 'Розкажіть нам про вашу компанію та як Elvarika може допомогти...',
      submit: 'Надіслати запит',
      submitting: 'Надсилання...',
      submitted: 'Запит надіслано!',
      verificationSent: 'Ми надіслали посилання для підтвердження на вашу електронну пошту. Натисніть на посилання для доступу до демо.',
      verify: 'Підтвердити пошту',
      verifying: 'Підтвердження...',
      verified: 'Пошта підтверджена! Тепер ви маєте доступ до демо.',
      accessDemo: 'Відкрити демо',
      demoNote: 'Для демонстраційних цілей токен верифікації показано нижче. У продакшені це надсилається електронною поштою.',
    },
    en: {
      title: 'Get Demo Access',
      subtitle: 'Please fill out the form to access the interactive demonstration',
      name: 'Name',
      email: 'Email Address',
      message: 'Message (optional)',
      messagePlaceholder: 'Tell us about your company and how Elvarika can help...',
      submit: 'Submit Request',
      submitting: 'Submitting...',
      submitted: 'Request Submitted!',
      verificationSent: 'We\'ve sent a verification link to your email. Click the link to access the demo.',
      verify: 'Verify Email',
      verifying: 'Verifying...',
      verified: 'Email verified! You now have access to the demo.',
      accessDemo: 'Open Demo',
      demoNote: 'For demo purposes, the verification token is shown below. In production, this would be sent via email.',
    }
  };

  const t = texts[language];

  // Check if user already has access via cookie on component mount
  useEffect(() => {
    const checkExistingAccess = async () => {
      try {
        const response = await fetch('/api/check-demo-access', {
          method: 'GET',
          credentials: 'include', // Include cookies
        });
        const data = await response.json();
        
        if (data.hasAccess && data.verified) {
          // User already has access, grant it immediately
          setIsVerified(true);
          onAccessGranted();
        }
      } catch (error) {
        console.log('Access check failed:', error);
        // Continue with normal flow if check fails
      } finally {
        setIsCheckingAccess(false);
      }
    };

    checkExistingAccess();
  }, [onAccessGranted]);

  const submitRequest = useMutation({
    mutationFn: async (data: typeof formData) => {
      try {
        const response = await fetch('/api/demo-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to submit request');
        }
        return response.json();
      } catch (error) {
        console.error('Submit request error:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data?.success) {
        setIsSubmitted(true);
        if (data.verificationToken) {
          setVerificationToken(data.verificationToken);
        }
        toast({
          title: t.submitted,
          description: data.emailSent ? t.verificationSent : data.demoNote || t.verificationSent,
        });
      } else {
        throw new Error('Request submission failed');
      }
    },
    onError: (error) => {
      console.error('Submit mutation error:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit request. Please try again.',
        variant: 'destructive',
      });
    }
  });

  const verifyEmail = useMutation({
    mutationFn: async (token: string) => {
      try {
        const response = await fetch(`/api/verify/${token}`, {
          credentials: 'include' // Include cookies for verification
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Verification failed');
        }
        return response.json();
      } catch (error) {
        console.error('Verification error:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data?.success) {
        setIsVerified(true);
        toast({
          title: t.verified,
          description: '',
        });
      } else {
        throw new Error('Verification response invalid');
      }
    },
    onError: (error) => {
      console.error('Verification mutation error:', error);
      toast({
        title: 'Verification Failed',
        description: 'Invalid or expired verification token.',
        variant: 'destructive',
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    submitRequest.mutate(formData);
  };

  const handleVerify = () => {
    if (verificationToken) {
      verifyEmail.mutate(verificationToken);
    }
  };

  const handleAccessDemo = () => {
    onAccessGranted();
  };

  if (isVerified) {
    return (
      <Card className="w-full max-w-md mx-auto bg-green-50 border-green-200">
        <CardHeader className="text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <CardTitle className="text-green-800">{t.verified}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={handleAccessDemo}
            className="w-full bg-[#022f36] hover:bg-[#034a54] text-white"
          >
            {t.accessDemo}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto bg-blue-50 border-blue-200">
        <CardHeader className="text-center">
          <Mail className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <CardTitle className="text-blue-800">{t.submitted}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-blue-700 text-center">{t.verificationSent}</p>
          
          {/* Demo purposes only - show verification token */}
          {verificationToken && (
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
              <p className="text-xs text-yellow-800 mb-2">{t.demoNote}</p>
              <div className="bg-white p-2 rounded border font-mono text-xs break-all">
                {verificationToken}
              </div>
            </div>
          )}
          
          <Button 
            onClick={handleVerify}
            disabled={verifyEmail.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {verifyEmail.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.verifying}
              </>
            ) : (
              t.verify
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <Lock className="h-16 w-16 text-[#022f36] mx-auto mb-4" />
        <CardTitle className="text-[#022f36]">{t.title}</CardTitle>
        <p className="text-sm text-gray-600">{t.subtitle}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t.name}</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              placeholder="Your name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">{t.email}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              placeholder="your@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">{t.message}</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder={t.messagePlaceholder}
              rows={3}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={submitRequest.isPending || !formData.name || !formData.email}
            className="w-full bg-[#022f36] hover:bg-[#034a54] text-white"
          >
            {submitRequest.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.submitting}
              </>
            ) : (
              t.submit
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}