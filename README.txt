STOCKPEDIA v1.6 — AI + Account integration scaffold

WHAT CHANGED
- Added Berkshire Hathaway historical profile with correct distinction between predecessor founder Oliver Chace, 1955 merger, and Warren Buffett's 1965 control.
- Added Berkshire businesses, products, timeline, risks and relationships.
- Expanded TSMC / ASML / NVIDIA / Applied Materials / Lam / KLA / memory supplier connections with clear relationship types.
- Added Stockpedia AI chat interface. It works in demo mode with a small built-in answer when no backend is configured.
- Added secure backend scaffold for a real AI assistant via Supabase Edge Function. OpenAI API key stays server-side.
- Added Supabase email sign-up/sign-in wiring. It becomes functional after you configure your own Supabase project.
- Removed SpaceX from public-company market-cap rankings: it is a private company, not a publicly traded stock.
- Ranking data is a dated snapshot, not live. As of the cited 8 Nov 2026 snapshot Apple is listed ahead of NVIDIA; other snapshots/dates can differ.

ENABLE REAL ACCOUNTS
1. Create a Supabase project.
2. In Supabase Project Settings > API, copy Project URL and anon/public key.
3. Put those two PUBLIC values in config.js. Do NOT put service_role key there.
4. Run supabase/schema.sql in Supabase SQL Editor.
5. Deploy the site to a static host over HTTPS.

ENABLE REAL AI
1. Add an OpenAI API key as a Supabase Edge Function secret: supabase secrets set OPENAI_API_KEY=...
2. Deploy: supabase functions deploy stockpedia-ai
3. Configure the Supabase project URL and anon key in config.js.
4. AI calls the server-side Edge Function with web search enabled; the API key is never exposed in browser code. API usage is billed separately from ChatGPT Go. Web search tool calls are currently priced at USD 10 per 1,000 calls plus model token usage; set project spend limits and request limits before public launch.

IMPORTANT
- This ZIP contains a working integration scaffold, not a deployed Supabase project. Account sign-up and AI will not work until you supply/configure your own backend.
- Never send or publish a Supabase service_role key or OpenAI API key in chat or frontend files.
- The market-cap table is historical snapshot data, not live market data. Values and ranking change.
- Company relationship claims must be backed by annual reports or company disclosures.

Open index.html in a browser for the frontend prototype. For Supabase login and Edge Function calls, serve the folder over HTTPS after config and deployment. The AI function requires a signed-in user (JWT verification is enabled).
