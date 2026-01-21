FROM node:24-alpine AS dev
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

FROM dev AS build
RUN npm run build
CMD ["npm", "run", "start:prod"]
