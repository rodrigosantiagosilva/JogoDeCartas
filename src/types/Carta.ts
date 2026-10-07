export type Naipe =
  | "♥"
  | "♦"
  | "♣"
  | "♠";

export interface Carta {
  id: string;
  valor: string;
  naipe: Naipe;
  cor: "red" | "black";
}

export type Card = Carta;
