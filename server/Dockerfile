FROM node:20-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY ./package.json package-lock.json* ./

RUN npm install --save

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]