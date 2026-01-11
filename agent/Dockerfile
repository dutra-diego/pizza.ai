FROM node:22-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends git openssh-client && rm -rf /var/lib/apt/lists/*
RUN git config --global url."https://github.com/".insteadOf ssh://git@github.com/
RUN git config --global url."https://github.com/".insteadOf git@github.com:
COPY package.json package-lock.json ./
RUN npm ci --force
COPY . .
RUN DATABASE_URL_PRISMA=postgresql://x:x@x:5432/x DATABASE_URL_MASTRA=postgresql://x:x@x:5432/x JWT_KEY=dummy npx prisma generate
EXPOSE 8080
CMD ["npm", "run", "dev"]
