FROM node:22-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN DATABASE_URL_PRISMA=postgresql://x:x@x:5432/x DATABASE_URL_MASTRA=postgresql://x:x@x:5432/x JWT_KEY=dummy npx prisma generate
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]
