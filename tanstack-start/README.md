```
cd tanstack-start
pnpm install
docker compose up -d
pnpm start


creer le .env :
DATABASE_URL=postgresql://username:password@localhost:5432/default_database
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
NODE_ENV=development


pnpm p:g
pnpm p:m

pnpm dev
```
