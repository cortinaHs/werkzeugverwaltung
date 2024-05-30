FROM node:20-alpine3.18

WORKDIR /app

COPY ./package.json package-lock.json* ./

# RUN npm install prisma --save-dev
RUN npm ci

COPY src ./src
COPY public ./public
COPY prisma ./prisma
COPY jsconfig.json ./
COPY next.config.mjs ./
COPY postcss.config.mjs ./
COPY tailwind.config.js ./
COPY .env ./

COPY docker/node/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]

CMD ["npm", "run", "dev"]


