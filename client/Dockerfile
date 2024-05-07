FROM node:20-alpine

WORKDIR /app

COPY ./package.json package-lock.json* ./

RUN npm ci

COPY src ./src
COPY public ./public
COPY jsconfig.json ./
COPY next.config.mjs ./
COPY postcss.config.mjs ./
COPY tailwind.config.js ./

CMD ["npm", "run", "dev"]