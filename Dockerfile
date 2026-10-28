
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Gera o Prisma Client a partir do schema (o schema só existe depois do COPY)
RUN npx prisma generate

EXPOSE 3333

CMD ["npm", "start"]
