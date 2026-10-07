import type { Partida } from "../types/Partida";
const KEY = "burro-match-history-v1";
export function listarPartidas(): Partida[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
export function salvarPartida(partida: Partida) {
  localStorage.setItem(
    KEY,
    JSON.stringify([partida, ...listarPartidas()].slice(0, 50)),
  );
}
export function excluirPartida(id: string) {
  localStorage.setItem(
    KEY,
    JSON.stringify(listarPartidas().filter((p) => p.id !== id)),
  );
}
export function limparHistorico() {
  localStorage.removeItem(KEY);
}
