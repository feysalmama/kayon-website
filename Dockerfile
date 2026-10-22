FROM node:22-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci

FROM node:22-bookworm-slim AS builder
WORKDIR /app
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_HERO_VIDEO
ARG NEXT_PUBLIC_PRINTER_VIDEO
ARG NEXT_PUBLIC_VISITOR_VIDEO
ARG NEXT_PUBLIC_IDENTITY_VIDEO
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_HERO_VIDEO=$NEXT_PUBLIC_HERO_VIDEO
ENV NEXT_PUBLIC_PRINTER_VIDEO=$NEXT_PUBLIC_PRINTER_VIDEO
ENV NEXT_PUBLIC_VISITOR_VIDEO=$NEXT_PUBLIC_VISITOR_VIDEO
ENV NEXT_PUBLIC_IDENTITY_VIDEO=$NEXT_PUBLIC_IDENTITY_VIDEO
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN mkdir -p data/uploads
RUN PAYLOAD_SECRET=build-only-secret-not-used-at-runtime-0123456789 \
    DATABASE_URI=postgres://build:build@127.0.0.1:5432/build \
    npm run build

FROM builder AS runtime-dependencies
RUN npm prune --omit=dev --no-audit --no-fund

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 --gid nodejs nextjs \
    && mkdir -p /app/data/uploads \
    && chown -R nextjs:nodejs /app/data/uploads
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=runtime-dependencies --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./tsconfig.json
COPY --from=builder --chown=nextjs:nodejs /app/payload.config.ts ./payload.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/collections ./collections
COPY --from=builder --chown=nextjs:nodejs /app/data ./data
COPY --from=builder --chown=nextjs:nodejs /app/globals ./globals
COPY --from=builder --chown=nextjs:nodejs /app/lib ./lib
COPY --from=builder --chown=nextjs:nodejs /app/migrations ./migrations
USER nextjs
EXPOSE 3000
CMD ["sh", "-c", "node node_modules/payload/bin.js migrate && node server.js"]
