FROM node:20-alpine AS dev-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM dev-deps AS dev
ENV NODE_ENV=development
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

FROM node:20-alpine AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM dev-deps AS build
COPY . .
RUN npm run build

FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
