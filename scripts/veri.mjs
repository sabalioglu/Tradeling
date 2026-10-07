// data.js okuma, yazma ve biçimleme. Diğer betikler bu modülü kullanır.
//   node scripts/veri.mjs bicimle   → data.js'i standart biçime getirir
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const DATA_PATH = join(ROOT, "data.js");

const HEADER = `/* Türkiye Hububat Masası · bülten verisi.
   Bu dosyayı her sabah Claude rutini günceller (.claude/skills/sabah-guncellemesi/SKILL.md).
   Biçim: window.HUBUBAT ataması ve ardından saf JSON. Alanlar: README → Veri sözleşmesi.
   Değiştirdikten sonra: node scripts/veri.mjs bicimle && node scripts/kontrol.mjs */
`;
const PREFIX = "window.HUBUBAT = ";

export function parseData(src) {
  const m = /^window\.HUBUBAT = /m.exec(src);
  if (!m) throw new Error(`data.js içinde satır başında "${PREFIX.trim()}" bulunamadı`);
  const body = src.slice(m.index + PREFIX.length).trim().replace(/;$/, "");
  try {
    return JSON.parse(body);
  } catch (e) {
    throw new Error("data.js geçerli JSON değil: " + e.message);
  }
}

export function readData(path = DATA_PATH) {
  return parseData(readFileSync(path, "utf8"));
}

function oneLine(v) {
  if (v === null || typeof v !== "object") return JSON.stringify(v);
  if (Array.isArray(v)) return "[" + v.map(oneLine).join(", ") + "]";
  const keys = Object.keys(v);
  return keys.length ? "{ " + keys.map((k) => JSON.stringify(k) + ": " + oneLine(v[k])).join(", ") + " }" : "{}";
}

// Kısa nesne ve dizileri tek satırda tutar; böylece her veri noktası, kaynak ve kayıt ayrı satırda kalır.
export function formatJSON(value, indent = "") {
  const one = oneLine(value);
  if (value === null || typeof value !== "object" || one.length + indent.length <= 120) return one;
  const next = indent + "  ";
  if (Array.isArray(value)) {
    return "[\n" + value.map((v) => next + formatJSON(v, next)).join(",\n") + "\n" + indent + "]";
  }
  const keys = Object.keys(value);
  return "{\n" + keys.map((k) => next + JSON.stringify(k) + ": " + formatJSON(value[k], next)).join(",\n") + "\n" + indent + "}";
}

export function writeData(data, path = DATA_PATH) {
  writeFileSync(path, HEADER + PREFIX + formatJSON(data) + ";\n");
}

export function loadTazelik() {
  const ctx = vm.createContext({});
  vm.runInContext(readFileSync(join(ROOT, "tazelik.js"), "utf8"), ctx);
  return ctx.HububatTazelik;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const cmd = process.argv[2];
  if (cmd === "bicimle") {
    writeData(readData());
    console.log("data.js biçimlendi.");
  } else {
    console.log("Kullanım: node scripts/veri.mjs bicimle");
    process.exit(cmd ? 1 : 0);
  }
}
