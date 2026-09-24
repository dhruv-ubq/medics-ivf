# Multi-stage Dockerfile for Next.js application
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --include=dev

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG BASE_PATH=""
ENV BASE_PATH=${BASE_PATH}
ENV NEXT_PUBLIC_BASE_PATH=${BASE_PATH}

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
# Dummy URI for build step in case Next.js parses route configurations
ENV MONGODB_URI=mongodb://127.0.0.1:27017/medics-ivf

RUN npm run build
# Ensure font-manifest.json exists to prevent ENOENT if optimizeFonts is disabled
RUN [ -f .next/server/font-manifest.json ] || echo "[]" > .next/server/font-manifest.json
RUN npm prune --production

FROM node:20-alpine AS runner
WORKDIR /app

ARG BASE_PATH=""
ENV BASE_PATH=${BASE_PATH}
ENV NEXT_PUBLIC_BASE_PATH=${BASE_PATH}

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy runtime dependencies and build artifacts
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/middleware.js ./middleware.js
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/lib ./lib

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
