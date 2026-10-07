export type { Card } from "./types/Carta";

import type { Card } from "./types/Carta";
import type { Jogador } from "./types/Jogador";

/*
 * Aliases para manter compatibilidade
 * com o restante do projeto.
 */
export type Suit =
  | "♥"
  | "♦"
  | "♣"
  | "♠";

export type PlayerStatus =
  | "connected"
  | "disconnected"
  | "pending";

export type Player = Jogador;

/*
 * Mensagens Bluetooth
 */
export interface BluetoothMessage {
  type:
    | "SOLICITACAO_ENTRADA"
    | "JOGADOR_ENTROU"
    | "PARTIDA_INICIADA"
    | "JOGADA"
    | "TROCA_REALIZADA"
    | "JOGADOR_COMPLETOU"
    | "PARTIDA_FINALIZADA"
    | "JOGADOR_DESCONECTADO"
    | "RECONEXAO";

  partidaId: string;
  remetenteId: string;
  timestamp: number;
  payload: unknown;
}

/*
 * Valores das cartas
 */
const valores = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

/*
 * Naipes
 */
const naipes: Suit[] = [
  "♥",
  "♦",
  "♣",
  "♠",
];

/*
 * Cria o baralho
 */
export function createDeck(): Card[] {
  return valores.flatMap((valor) =>
    naipes.map((naipe, index) => ({
      id: `${valor}-${naipe}`,
      valor,
      naipe,
      cor:
        index < 2
          ? "red"
          : "black",
    })),
  );
}

/*
 * Embaralha as cartas
 */
export function shuffle<T>(
  items: T[],
  random = Math.random,
): T[] {
  const copy = [...items];

  for (
    let i = copy.length - 1;
    i > 0;
    i--
  ) {
    const j = Math.floor(
      random() * (i + 1),
    );

    [
      copy[i],
      copy[j],
    ] = [
      copy[j],
      copy[i],
    ];
  }

  return copy;
}

/*
 * Distribui as cartas entre os jogadores
 */
export function dealHands(
  players: Jogador[],
  random = Math.random,
): Record<string, Card[]> {
  const deck = shuffle(
    createDeck(),
    random,
  );

  const hands: Record<
    string,
    Card[]
  > = {};

  players.forEach(
    (player, index) => {
      hands[player.id] =
        deck.slice(
          index * 4,
          index * 4 + 4,
        );
    },
  );

  return hands;
}

/*
 * Verifica se o jogador possui
 * quatro cartas do mesmo valor.
 */
export function hasFourOfKind(
  hand: Card[],
): boolean {
  return (
    hand.length === 4 &&
    new Set(
      hand.map(
        (card) => card.valor,
      ),
    ).size === 1
  );
}

/*
 * Retorna o próximo jogador
 */
export function nextPlayerIndex(
  index: number,
  count: number,
): number {
  if (!count) {
    return 0;
  }

  return (
    index + 1
  ) % count;
}

/*
 * Verifica se a jogada pode
 * ser realizada.
 */
export function canPlay(
  isMyTurn: boolean,
  selectedCard: Card | null,
  hand: Card[],
): boolean {
  return (
    isMyTurn &&
    !!selectedCard &&
    hand.some(
      (card) =>
        card.id ===
        selectedCard.id,
    )
  );
}

/*
 * Aplica uma letra de BURRO
 * ao jogador.
 */
export function applyPenalty(
  player: Jogador,
): Jogador {
  const letters = [
    ...player.letrasBurro,
    "BURRO"[
      player.letrasBurro.length
    ] || "",
  ];

  return {
    ...player,
    letrasBurro:
      letters.slice(0, 5),
  };
}

/*
 * Verifica se o jogador foi eliminado.
 */
export function isEliminated(
  player: Jogador,
): boolean {
  return (
    player.letrasBurro.length >= 5
  );
}
