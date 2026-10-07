import { ref } from "vue";
import type { MensagemBluetooth } from "../types/Bluetooth";
export const bluetoothAtivo = ref(true);
export const bluetoothConectado = ref(true);
export function alternarBluetooth() {
  bluetoothAtivo.value = !bluetoothAtivo.value;
  if (!bluetoothAtivo.value) bluetoothConectado.value = false;
}
export function criarMensagem(
  tipo: MensagemBluetooth["tipo"],
  partidaId: string,
  remetenteId: string,
  payload: unknown,
): MensagemBluetooth {
  return { tipo, partidaId, remetenteId, timestamp: Date.now(), payload };
}
export async function solicitarPermissoesBluetooth() {
  return bluetoothAtivo.value;
}
