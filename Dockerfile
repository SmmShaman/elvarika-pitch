# --- Етап 1: "Будівельник" (Builder) ---
# Тут ми встановлюємо ВСІ залежності (включно з devDependencies) і збираємо проект
FROM node:20-slim AS builder

# Встановлюємо робочу директорію всередині контейнера
WORKDIR /app

# Копіюємо package.json і package-lock.json для кешування залежностей
COPY package*.json ./

# Встановлюємо всі залежності
RUN npm install

# Копіюємо решту файлів проекту
COPY . .

# Запускаємо наш скрипт збірки
# Він створить папку /app/client/dist (фронтенд) і /app/dist (бекенд)
RUN npm run build


# --- Етап 2: "Продакшн" (Production) ---
# Тут ми створюємо фінальний, легкий контейнер тільки з тим, що потрібно для запуску
FROM node:20-slim

WORKDIR /app

# Копіюємо package.json і package-lock.json ще раз
COPY package*.json ./

# Встановлюємо ТІЛЬКИ production залежності
RUN npm install --omit=dev

# Копіюємо скомпільований код з етапу "Будівельник"
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/dist ./client/dist

# Відкриваємо порт, на якому буде працювати сервер (Cloud Run використовує 8080)
EXPOSE 8080

# Команда для запуску нашого сервера
CMD [ "npm", "start" ]