FROM node:18-alpine
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm install
RUN npm run build
## this is stage two , where the app actually runs
FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --only=production
COPY --from=0 /app/dist .
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node","dist/app.js"]