/* =========================================================
   Executa JavaScript do aluno com segurança:
   - roda num Web Worker (isolado da página)
   - captura console.log
   - corta loops infinitos após um tempo limite
   ========================================================= */

const WORKER_SRC = `
const fmt = (args) => args.map((v) =>
  typeof v === "object" && v !== null ? JSON.stringify(v) : String(v)
).join(" ");
self.onmessage = (e) => {
  const out = [];
  const fakeConsole = {
    log: (...a) => out.push(fmt(a)),
    info: (...a) => out.push(fmt(a)),
    warn: (...a) => out.push(fmt(a)),
    error: (...a) => out.push(fmt(a)),
  };
  try {
    new Function("console", e.data)(fakeConsole);
    self.postMessage({ ok: true, out });
  } catch (err) {
    self.postMessage({ ok: false, out, error: err.name + ": " + err.message, blocked: err instanceof EvalError });
  }
};`;

let workerUrl = null;

/**
 * @returns {Promise<{ ok: boolean, out: string[], error?: string, blocked?: boolean }>}
 */
export function runJavaScript(code, timeoutMs = 2000) {
  return new Promise((resolve) => {
    let worker;
    try {
      workerUrl ||= URL.createObjectURL(new Blob([WORKER_SRC], { type: "text/javascript" }));
      worker = new Worker(workerUrl);
    } catch {
      resolve({ ok: false, out: [], error: "Este navegador não permite executar código aqui.", blocked: true });
      return;
    }
    const timer = setTimeout(() => {
      worker.terminate();
      resolve({ ok: false, out: [], error: `O código demorou mais de ${timeoutMs / 1000}s. Será que tem um loop infinito?` });
    }, timeoutMs);
    worker.onmessage = (e) => { clearTimeout(timer); worker.terminate(); resolve(e.data); };
    worker.onerror = (e) => {
      e.preventDefault();
      clearTimeout(timer);
      worker.terminate();
      resolve({ ok: false, out: [], error: e.message || "Erro ao executar o código." });
    };
    worker.postMessage(code);
  });
}
