# Couple Dare

Mobile-first React web app for two consenting adults. It works entirely offline by default: games, settings and custom dares are saved in the browser's local storage. Supabase is optional groundwork for future account and multiplayer features.

## Local start

```bash
npm install
npm run dev
```

For a production check run:

```bash
npm run build
```

## Deploy to Netlify

1. Create an empty GitHub repository, then commit and push this project.
2. In Netlify select **Add new site → Import an existing project**, choose the repository and leave the detected build values as `npm run build` and `dist`.
3. Deploy. The included `netlify.toml` also makes direct routes safe for this single-page application.

No environment variables are required for an offline-only deployment.

## Optional Supabase setup

1. Create a Supabase project.
2. Open **SQL Editor**, paste and run [`supabase/schema.sql`](supabase/schema.sql).
3. In **Authentication → Providers**, enable **Anonymous sign-ins**. This gives each browser a private, non-identifying ID for the RLS-protected Dare library; no email or profile is required.
4. Copy the project URL and public **anon** key into Netlify's environment variables as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Use `.env.example` as the local template.
5. Redeploy after setting the variables.

Never add the Supabase service-role key to Netlify or a `.env` file used by Vite: it must only run on trusted server infrastructure. With those variables set, custom Dares are automatically merged and saved under the browser's anonymous Supabase identity. Online invitations and real-time game state can be added on top of the RLS schema without changing the offline game flow.

## Product notes

- 150 built-in, non-graphic dares: 30 per spice level.
- Progression uses a 0–100 spice score; completed dares increase it and levels are derived from it.
- The randomizer shuffles candidates, avoids the prior dare, and prefers unused tasks until a candidate group has been exhausted.
- Every activity is optional. Skips, pause, category filtering and a configurable maximum level remain available throughout.
