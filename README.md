## How to start

```
# start db
docker-compose up -d

# migrate db
npx prisma migrate dev

# start
npm run dev
```

## How to deploy Vercel

1. HerokuにてDB立ち上げ（Postgres等）
2. Vercelの環境変数に以下を設定
  - `DATABASE_URL`: 上記HerokuのデータベースへURI
3. Vercelにてデプロイ
