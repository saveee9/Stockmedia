// Deploy with: supabase functions deploy stockpedia-ai
// Set secret: supabase secrets set OPENAI_API_KEY=... (never put this key in config.js)
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" };
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: cors });
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) return Response.json({ error: "AI service is not configured" }, { status: 503, headers: cors });
  try {
    const { question, company, language } = await req.json();
    if (typeof question !== "string" || question.trim().length < 2 || question.length > 5000) return Response.json({ error: "Invalid question" }, { status: 400, headers: cors });
    const system = `You are Stockpedia Research Assistant. Explain public companies and business ecosystems in accessible detail. Answer in ${language === "en" ? "English" : "Thai"}. Distinguish verified facts, company statements, analyst expectations and your own inference. Never invent founder names, product launch dates, market caps, financial figures, supplier/customer links or current prices. If company data is missing, say so and suggest primary sources such as annual reports, SEC filings and investor relations. Clarify that market cap and share prices change. Do not give personalized buy/sell recommendations.`;
    const input = `Company context (may be null): ${JSON.stringify(company ?? {})}\n\nUser question: ${question}`;
    const r = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: "gpt-6-luna", tools: [{ type: "web_search" }], instructions: system, input, max_output_tokens: 1400 }) });
    const data = await r.json();
    if (!r.ok) return Response.json({ error: data.error?.message ?? "AI provider error" }, { status: 502, headers: cors });
    const answer = (data.output ?? []).flatMap((o: any) => o.content ?? []).filter((c: any) => c.type === "output_text").map((c: any) => c.text).join("\n");
    const webSources = (data.output ?? []).filter((o: any) => o.type === "web_search_call").flatMap((o: any) => o.action?.sources ?? []).map((s: any) => `${s.title ?? "Source"}: ${s.url}`).join("\n");
    return Response.json({ answer, sources: webSources || (company ? `Company context: ${company.name} (${company.ticker}); verify figures against the linked primary filings.` : "Verify current figures against primary filings and official investor-relations sources.") }, { headers: { ...cors, "Content-Type": "application/json" } });
  } catch (e) { return Response.json({ error: String(e) }, { status: 500, headers: cors }); }
});
