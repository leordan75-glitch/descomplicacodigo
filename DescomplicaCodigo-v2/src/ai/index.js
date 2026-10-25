/* =========================================================
   ⭐ PONTO ÚNICO DA "IA"
   O resto do app só conhece generateAnswer(text, lang) e espera
   receber { html, plain, lang }.

   Hoje: respostas locais, sem internet.
   Para ligar uma IA real, troque o corpo de generateAnswer por:

     const res = await fetch("/api/ai", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ text, lang }),
     });
     if (!res.ok) throw new Error("Falha na IA");
     return res.json(); // o backend devolve { html, plain, lang }

   A chave da API fica SÓ no backend (nunca no navegador).
   ========================================================= */
import { findError } from "../data/errors.js";
import { looksLikeCode, extractCode, detectLang, detectIntent } from "./detect.js";
import {
  explainResponse, fixResponse, improveResponse, convertResponse,
  errorResponse, askForCode, genericResponse, generateResponse,
} from "./responses.js";

export async function generateAnswer(text, forcedLang = "auto") {
  return localAnswer(text, forcedLang);
}

export function localAnswer(text, forcedLang = "auto") {
  const intent = detectIntent(text);
  const lower = text.toLowerCase();
  const moneyPatterns = /(dólar|dolar|real|euro|libra|yuan|iene|won)/i;
  const isMoneyConversion = /\b(?:converta|converter|transforme)\b/.test(lower) && /\d+(?:[.,]\d+)?/.test(lower) && moneyPatterns.test(lower) && /\b(?:para|pra)\b/.test(lower);

  if (looksLikeCode(text)) {
    const code = extractCode(text);
    const lang = forcedLang !== "auto" ? forcedLang : detectLang(code);
    if (intent.generate) return generateResponse(code || text, lang, text);
    if (intent.convert) return convertResponse(code, intent.target || (lang === "python" ? "javascript" : "python"), lang);
    if (intent.fix) return fixResponse(code, lang);
    if (intent.improve) return improveResponse(code, lang);
    return explainResponse(code, lang);
  }

  const err = findError(text);
  if (err) return errorResponse(err);
  if (isMoneyConversion) return generateResponse(text, forcedLang !== "auto" ? forcedLang : "javascript", text);
  if (intent.generate) return generateResponse(text, forcedLang !== "auto" ? forcedLang : "javascript", text);
  if (intent.fix) return askForCode("fix");
  if (intent.convert) return askForCode("convert", intent.target);
  return genericResponse(text);
}
