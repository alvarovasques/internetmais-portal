# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --no-frozen-lockfile
COPY . .
RUN pnpm run build

# Stage 2: Runtime
FROM node:22-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/public ./client/public
RUN pnpm install --no-frozen-lockfile --prod
EXPOSE 3000
CMD ["pnpm", "start"]
