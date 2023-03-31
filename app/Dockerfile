FROM node:18-alpine AS builder

WORKDIR /app
ARG VITE_SERVER_URL=http://localhost:3000

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host"]

#FROM nginx:1.22-alpine
#EXPOSE 80
#COPY --from=builder /app/dist /usr/share/nginx/html