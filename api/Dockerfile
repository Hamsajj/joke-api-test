FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm install
RUN npm run build
## this is stage two , where the app actually runs
FROM node:18-alpine as runner
WORKDIR /app
COPY package.json ./
RUN npm install --only=production
COPY --from=builder /app/dist .
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "app.js"]