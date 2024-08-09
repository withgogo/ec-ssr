FROM registry.cn-shanghai.aliyuncs.com/helix2h/node:18.12.0 as builder

WORKDIR /app

COPY . .

RUN yarn config set registry https://registry.npmmirror.com

ENV NODE_ENV=production

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN yarn build

FROM registry.cn-shanghai.aliyuncs.com/helix2h/node:18.12.0

RUN mkdir -p /nuxt3

COPY --from=builder /app/.output  /nuxt3

WORKDIR /nuxt3

ENV HOST 0.0.0.0
EXPOSE 80

CMD ["node","./server/index.mjs"]
