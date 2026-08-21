# syntax=docker/dockerfile:1
FROM node:26-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN corepack enable && corepack prepare --activate && \
    pnpm install --frozen-lockfile

COPY . .

# GITHUB_TOKEN is mounted as a BuildKit secret (not a build ARG) so it never
# lands in an image layer or build history. `next build` performs static
# generation for /projects/[slug], which calls the GitHub API at build time
# (see src/lib/github.ts) and needs this token for authenticated, higher
# rate-limited requests.
RUN --mount=type=secret,id=github_token,env=GITHUB_TOKEN \
    pnpm build

FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Run nginx as the non-root "nginx" user (uid/gid 101) already created in
# the base image. Docker grants containers CAP_NET_BIND_SERVICE by default,
# so a non-root process can still bind to port 80 inside the container.
RUN chown -R nginx:nginx /var/cache/nginx /run

USER nginx

EXPOSE 80

# nginx:alpine ships no HEALTHCHECK. The deploy workflow polls
# `docker compose ps --format json` for a "healthy" string; without this
# instruction that string never appears, the poll always exhausts its
# retries, and every deploy fails after 120s regardless of whether the app
# is actually serving traffic. curl is not guaranteed on nginx:alpine;
# busybox wget is.
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --spider -q http://127.0.0.1:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
