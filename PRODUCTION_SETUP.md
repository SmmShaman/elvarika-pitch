# Перехід з Демо в Продакшн - Elvarika Email Верифікація

## Поточний Стан
✅ Email система працює в демо режимі  
✅ База даних PostgreSQL налаштована  
✅ API endpoints створені  
✅ Frontend інтегрований  

## Що потрібно для продакшну

### 1. Налаштування Email Сервісу (ОБОВ'ЯЗКОВО)

#### Варіант A: Gmail + App Password (Безкоштовно, рекомендовано для тестування)
```bash
# Додайте ці змінні оточення в Replit Secrets:
GMAIL_EMAIL=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
```

**Як отримати App Password:**
1. Увімкніть 2-Factor Authentication в Google акаунті
2. Перейдіть: Google Account → Security → App passwords
3. Створіть новий пароль для "Mail"
4. Скопіюйте 16-символьний пароль

#### Варіант B: Resend.com (Професійний, 3000 emails/місяць безкоштовно)
```bash
# Замініть email.ts на:
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (to, name, token) => {
  await resend.emails.send({
    from: 'demo@yourdomain.com',
    to: [to],
    subject: 'Elvarika Demo Access',
    html: htmlContent,
  });
};
```

### 2. Додайте в Replit Secrets
```
BASE_URL=https://your-replit-app.replit.app
GMAIL_EMAIL=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

### 3. Оновіть server/email.ts
Зміните рядок 13 для продакшну:
```javascript
// Замість:
console.warn('Gmail credentials not provided. Email verification will use demo mode.');

// На:
throw new Error('Email credentials must be configured for production use');
```

### 4. Видаліть demo режим з API
У `server/routes.ts` видаліть рядки 34-42:
```javascript
// Видалити цей блок:
// } else {
//   // Demo mode - return token for testing
//   res.json({ 
//     success: true, 
//     message: "Demo request submitted...",
//     verificationToken: verificationToken,
//     demoNote: "Email service not configured..."
//   });
// }
```

### 5. Очистіть frontend від demo елементів
У `client/src/components/DemoAccessForm.tsx` видаліть:
```javascript
// Видалити рядки 185-192:
{verificationToken && (
  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
    <p className="text-xs text-yellow-800 mb-2">{t.demoNote}</p>
    <div className="bg-white p-2 rounded border font-mono text-xs break-all">
      {verificationToken}
    </div>
  </div>
)}
```

## Тестування Продакшн Режиму

1. **Додайте email credentials в Replit Secrets**
2. **Перезапустіть сервер**
3. **Протестуйте реєстрацію:**
   - Заповніть форму з справжнім email
   - Перевірте, що email приходить
   - Натисніть посилання верифікації
   - Переконайтеся, що демо відкривається

## Альтернативні Email Сервіси

### Brevo (300 emails/день безкоштовно)
```javascript
// Встановіть: npm install @sendinblue/client
const SibApiV3Sdk = require('@sendinblue/client');
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
```

### EmailJS (200 emails/місяць, клієнтський)
```javascript
// Встановіть: npm install emailjs-com
import emailjs from 'emailjs-com';

emailjs.send(
  'service_id',
  'template_id',
  templateParams,
  'user_id'
);
```

## Безпека для Продакшну

1. **Таймаут токенів** - токени діють 24 години
2. **Rate limiting** - обмежте кількість запитів на email
3. **Валідація email** - перевіряйте формат email
4. **HTTPS** - Replit автоматично забезпечує HTTPS

## Моніторинг

Додайте логування в `server/email.ts`:
```javascript
console.log(`Verification email sent to ${to} at ${new Date().toISOString()}`);
```

## Готово!
Після виконання цих кроків ваша система буде повністю готова для продакшну з професійною email верифікацією.