// Public browser configuration only. Safe to expose the Supabase anon key when Row Level Security is enabled.
// NEVER put SUPABASE_SERVICE_ROLE_KEY or OPENAI_API_KEY in this file.
window.STOCKPEDIA_CONFIG = {
  SUPABASE_URL: 'https://hsujslztglvcmcfompte.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_oJz8yO8l1hCUnjL1vKCcmg_lPOXqaMp',
  AI_FUNCTION_URL: '' // optional; defaults to SUPABASE_URL/functions/v1/stockpedia-ai
};
