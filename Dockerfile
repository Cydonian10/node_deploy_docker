FROM node:16.20.2-alpine3.18 as deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci


FROM node:16.20.2-alpine3.18 as builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

FROM node:16.20.2-alpine3.18 as runner

EXPOSE 3000

WORKDIR /app

COPY package.json package-lock.json ./
COPY start.sh /start.sh
COPY ./prisma .
RUN chmod +x /start.sh

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

#RUN npx prisma generate

CMD [ "/start.sh" ]