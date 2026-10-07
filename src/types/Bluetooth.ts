export type TipoMensagemBluetooth =
  | "SOLICITACAO_ENTRADA"
  | "JOGADOR_ENTROU"
  | "PARTIDA_INICIADA"
  | "JOGADA"
  | "TROCA_REALIZADA"
  | "JOGADOR_COMPLETOU"
  | "PARTIDA_FINALIZADA"
  | "JOGADOR_DESCONECTADO"
  | "RECONEXAO";
export interface MensagemBluetooth {
  tipo: TipoMensagemBluetooth;
  partidaId: string;
  remetenteId: string;
  timestamp: number;
  payload: unknown;
}
