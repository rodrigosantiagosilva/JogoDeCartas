export type StatusJogador = "connected" | "disconnected" | "pending";
export interface Jogador {
  id: string;
  nome: string;
  anfitriao: boolean;
  status: StatusJogador;
  letrasBurro: string[];
}
export type Player = Jogador;
