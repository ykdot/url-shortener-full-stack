# Stage 1: Build the TypeScript code
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Create a reusable production base
FROM node:18-alpine AS production-base
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Stage 3: Create the final server image
FROM production-base AS server
# Command to run the server
CMD ["node", "dist/app.js"]

# Stage 4: Create the final worker image
FROM production-base AS worker
# Command to run the worker (path from your docker-compose.yml)
CMD ["node", "dist/workers/worker.js"]
