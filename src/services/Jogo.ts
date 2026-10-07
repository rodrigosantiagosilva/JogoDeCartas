
import { computed, reactive, ref } from "vue";

import {
  canPlay,
  dealHands,
  hasFourOfKind,
  nextPlayerIndex,
} from "../game";

import type { Card } from "../types/Carta";
import type { Jogador } from "../types/Jogador";
import type { Partida } from "../types/Partida";

import { salvarPartida } from "./Historico";

export const idLocal =
  "local-" + Math.random().toString(36).slice(2, 8);

export const estado = reactive({
  nome: "",

  jogadores: [] as Jogador[],

  maos: {} as Record<string, Card[]>,

  turno: 0,

  rodada: 1,

  resultado: null as Partida | null,

  /**
   * Indica se a partida atual é contra bots.
   */
  modoSolo: false,

  /**
   * Indica se os bots estão fazendo suas jogadas.
   */
  processandoBot: false,
});

export const maoLocal = computed<Card[]>(
  () => estado.maos[idLocal] || [],
);

export const minhaVez = computed(
  () =>
    estado.jogadores[estado.turno]?.id === idLocal,
);

export const proximoJogador = computed(
  () =>
    estado.jogadores[
      nextPlayerIndex(
        estado.turno,
        estado.jogadores.length,
      )
    ],
);

export const jogadorAnterior = computed(
  () =>
    estado.jogadores[
      (estado.turno -
        1 +
        estado.jogadores.length) %
        estado.jogadores.length
    ],
);

export const cartaSelecionada =
  ref<Card | null>(null);

/**
 * Inicia a identificação do jogador.
 */
export function iniciarIdentificacao(
  nome: string,
) {
  estado.nome = nome.trim();

  estado.jogadores = [
    {
      id: idLocal,
      nome: estado.nome,
      anfitriao: true,
      status: "connected",
      letrasBurro: [],
    },
  ];

  estado.modoSolo = false;
  estado.resultado = null;
  estado.maos = {};
  estado.turno = 0;
  estado.rodada = 1;
}

/**
 * Adiciona um jogador Bluetooth.
 */
export function adicionarJogador(
  nome: string,
) {
  if (estado.jogadores.length >= 6) {
    return;
  }

  const n = estado.jogadores.length + 1;

  estado.jogadores.push({
    id: "guest-" + n,
    nome,
    anfitriao: false,
    status: "connected",
    letrasBurro: [],
  });
}

/**
 * Cria os bots para o modo solo.
 *
 * O jogador humano + 3 bots = 4 jogadores.
 */
function adicionarBots() {
  const nomesBots = [
    "Bot Ana",
    "Bot Bruno",
    "Bot Carla",
  ];

  nomesBots.forEach((nome, index) => {
    estado.jogadores.push({
      id: `bot-${index + 1}`,
      nome,
      anfitriao: false,
      status: "connected",
      letrasBurro: [],
    });
  });
}

/**
 * Inicia uma partida no modo solo.
 *
 * No modo solo, caso exista somente o jogador local,
 * três bots são adicionados automaticamente.
 */
export function iniciarPartidaSolo(): boolean {
  estado.modoSolo = true;

  /*
   * Mantém somente o jogador local.
   * Isso evita que jogadores antigos do Bluetooth
   * sejam carregados para a partida solo.
   */
  const jogadorLocal = estado.jogadores.find(
    (jogador) => jogador.id === idLocal,
  );

  if (!jogadorLocal) {
    return false;
  }

  estado.jogadores = [jogadorLocal];

  adicionarBots();

  estado.maos = dealHands(
    estado.jogadores,
  );

  estado.turno = 0;
  estado.rodada = 1;
  estado.resultado = null;
  estado.processandoBot = false;
  cartaSelecionada.value = null;

  return true;
}

/**
 * Inicia uma partida normal.
 *
 * Usado pelo Bluetooth.
 */
export function iniciarPartida(): boolean {
  if (estado.jogadores.length < 2) {
    return false;
  }

  estado.modoSolo = false;

  estado.maos = dealHands(
    estado.jogadores,
  );

  estado.turno = 0;
  estado.rodada = 1;
  estado.resultado = null;
  estado.processandoBot = false;
  cartaSelecionada.value = null;

  return true;
}

/**
 * Seleciona ou desseleciona uma carta.
 */
export function selecionarCarta(
  carta: Card,
) {
  if (!minhaVez.value) {
    return;
  }

  cartaSelecionada.value =
    cartaSelecionada.value?.id === carta.id
      ? null
      : carta;
}

/**
 * Escolhe qual carta um bot deve passar.
 *
 * Estratégia:
 *
 * 1. Conta quantas cartas existem de cada valor.
 * 2. Prioriza manter pares/trincas.
 * 3. Procura passar cartas cujo valor aparece
 *    somente uma vez na mão.
 * 4. Se todas forem repetidas, passa a primeira.
 */
function escolherCartaDoBot(
  mao: Card[],
): Card | null {
  if (mao.length === 0) {
    return null;
  }

  const quantidadePorValor =
    new Map<string, number>();

  for (const carta of mao) {
    const quantidade =
      quantidadePorValor.get(carta.valor) || 0;

    quantidadePorValor.set(
      carta.valor,
      quantidade + 1,
    );
  }

  /*
   * Procura uma carta cujo valor aparece
   * somente uma vez.
   *
   * Essa é a carta menos interessante para o bot,
   * então ele tenta passá-la.
   */
  const cartaUnica = mao.find(
    (carta) =>
      quantidadePorValor.get(carta.valor) === 1,
  );

  if (cartaUnica) {
    return cartaUnica;
  }

  /*
   * Caso todas as cartas façam parte de pares
   * ou trincas, escolhe uma carta qualquer.
   */
  return mao[0];
}

/**
 * Executa a jogada de um bot.
 */
async function jogarBot(): Promise<boolean> {
  const bot =
    estado.jogadores[estado.turno];

  if (!bot) {
    return false;
  }

  if (!bot.id.startsWith("bot-")) {
    return false;
  }

  const maoBot =
    estado.maos[bot.id] || [];

  if (maoBot.length === 0) {
    return false;
  }

  estado.processandoBot = true;

  /*
   * Pequeno atraso para a jogada do bot parecer
   * natural na interface.
   */
  await esperar(500);

  const carta = escolherCartaDoBot(
    maoBot,
  );

  if (!carta) {
    estado.processandoBot = false;
    return false;
  }

  const proximo =
    proximoJogador.value;

  if (!proximo) {
    estado.processandoBot = false;
    return false;
  }

  /*
   * Remove a carta da mão do bot.
   */
  const novaMaoBot =
    maoBot.filter(
      (item) => item.id !== carta.id,
    );

  /*
   * Entrega a carta ao próximo jogador.
   */
  const novaMaoProximo = [
    ...(estado.maos[proximo.id] || []),
    carta,
  ];

  estado.maos = {
    ...estado.maos,
    [bot.id]: novaMaoBot,
    [proximo.id]: novaMaoProximo,
  };

  /*
   * Verifica se o bot conseguiu formar quatro
   * cartas do mesmo valor.
   */
  if (hasFourOfKind(novaMaoBot)) {
    estado.processandoBot = false;

    finalizar(
      bot.nome,
      proximo.nome,
      `${bot.nome} formou quatro cartas do mesmo valor.`,
    );

    return true;
  }

  /*
   * Passa a vez para o próximo jogador.
   */
  estado.turno = nextPlayerIndex(
    estado.turno,
    estado.jogadores.length,
  );

  estado.rodada++;

  estado.processandoBot = false;

  /*
   * Se o próximo jogador também for bot,
   * continua automaticamente.
   */
  if (
    estado.modoSolo &&
    !estado.resultado &&
    estado.jogadores[
      estado.turno
    ]?.id.startsWith("bot-")
  ) {
    await jogarBot();
  }

  return true;
}

/**
 * Jogador humano passa uma carta.
 */
export async function passarCarta(): Promise<
  boolean | Partida
> {
  if (!minhaVez.value) {
    return false;
  }

  if (
    !canPlay(
      minhaVez.value,
      cartaSelecionada.value,
      maoLocal.value,
    )
  ) {
    return false;
  }

  const carta = cartaSelecionada.value;

  if (!carta) {
    return false;
  }

  const jogadorAtual =
    estado.jogadores[estado.turno];

  const proximo =
    proximoJogador.value;

  if (!jogadorAtual || !proximo) {
    return false;
  }

  /*
   * Guardamos a mão atual antes de remover
   * a carta.
   *
   * Isso é importante para verificar se o jogador
   * já tinha quatro cartas do mesmo valor.
   */
  const maoAntes =
    maoLocal.value;

  /*
   * Remove a carta da mão do jogador.
   */
  const novaMaoLocal =
    maoAntes.filter(
      (item) => item.id !== carta.id,
    );

  /*
   * Coloca a carta na mão do próximo jogador.
   */
  const novaMaoProximo = [
    ...(estado.maos[proximo.id] || []),
    carta,
  ];

  estado.maos = {
    ...estado.maos,
    [idLocal]: novaMaoLocal,
    [proximo.id]: novaMaoProximo,
  };

  cartaSelecionada.value = null;

  /*
   * Verifica a condição de vitória antes
   * de continuar para o próximo jogador.
   */
  if (hasFourOfKind(maoAntes)) {
    return finalizar(
      jogadorAtual.nome,
      proximo.nome,
      `${jogadorAtual.nome} formou quatro cartas do mesmo valor.`,
    );
  }

  /*
   * Passa a vez.
   */
  estado.turno = nextPlayerIndex(
    estado.turno,
    estado.jogadores.length,
  );

  estado.rodada++;

  /*
   * No modo solo, se a vez for de um bot,
   * ele começa automaticamente.
   */
  if (
    estado.modoSolo &&
    estado.jogadores[
      estado.turno
    ]?.id.startsWith("bot-")
  ) {
    await jogarBot();
  }

  return true;
}

/**
 * Pequena função para criar um atraso.
 */
function esperar(
  milissegundos: number,
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(
      resolve,
      milissegundos,
    );
  });
}

/**
 * Finaliza a partida.
 */
export function finalizar(
  vencedor: string,
  penalizado: string,
  motivo: string,
): Partida {
  const agora =
    new Date().toISOString();

  const p: Partida = {
    id: "match-" + Date.now(),

    status: "finalizada",

    inicio: new Date(
      Date.now() - 600000,
    ).toISOString(),

    fim: agora,

    jogadores: [
      ...estado.jogadores,
    ],

    vencedor,

    penalizado,

    rodadas: estado.rodada,

    resultado:
      vencedor === estado.nome
        ? "Vitória"
        : "Partida concluída",

    motivo,

    resultadoLocal:
      vencedor === estado.nome
        ? "Vencedor"
        : "Participante",
  };

  estado.resultado = p;
  estado.processandoBot = false;

  salvarPartida(p);

  return p;
}

/**
 * Inicia uma nova partida mantendo
 * somente o jogador local.
 */
export function novaPartida() {
  const jogadorLocal =
    estado.jogadores.find(
      (jogador) =>
        jogador.id === idLocal,
    );

  estado.jogadores =
    jogadorLocal
      ? [jogadorLocal]
      : [];

  estado.maos = {};
  estado.resultado = null;
  estado.rodada = 1;
  estado.turno = 0;
  estado.modoSolo = false;
  estado.processandoBot = false;

  cartaSelecionada.value = null;
}