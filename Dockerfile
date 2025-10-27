# Install dependencies only when needed
FROM node:18-alpine3.18 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN npm install -g --arch=x64 --platform=linux --libc=musl sharp@0.33.0-rc.2

# Migrate to yarn 4
RUN corepack enable
RUN yarn set version berry

COPY package.json ./
COPY .yarnrc.yml ./
COPY yarn.lock ./

RUN yarn install --immutable

# Rebuild the source code only when needed
FROM node:22-alpine3.18 AS builder
WORKDIR /app
COPY . .
COPY --from=deps --chown=nextjs:nodejs /usr/local/lib/node_modules/sharp /usr/local/lib/node_modules/sharp
COPY --from=deps /app/node_modules ./node_modules

ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL ${NEXT_PUBLIC_API_BASE_URL}

ARG NEXT_PUBLIC_PREPARE_NEXT_EDITION
ENV NEXT_PUBLIC_PREPARE_NEXT_EDITION ${NEXT_PUBLIC_PREPARE_NEXT_EDITION}

ARG NEXT_PUBLIC_EVENT_DATES
ENV NEXT_PUBLIC_EVENT_DATES ${NEXT_PUBLIC_EVENT_DATES}

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn prisma generate
RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine3.18 AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_SHARP_PATH=/usr/local/lib/node_modules/sharp
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1
COPY --from=deps --chown=nextjs:nodejs /usr/local/lib/node_modules/sharp /usr/local/lib/node_modules/sharp

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
