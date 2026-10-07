import type { Jogador } from "./Jogador";
export interface Partida {
  id: string;
  status: "finalizada" | "cancelada" | "interrompida";
  inicio: string;
  fim: string;
  jogadores: Jogador[];
  vencedor: string;
  penalizado: string;
  rodadas: number;
  resultado: string;
  motivo: string;
  resultadoLocal: string;
}
export type MatchRecord = Partida;
