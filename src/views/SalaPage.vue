<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  estado,
  adicionarJogador,
  iniciarPartida,
  iniciarPartidaSolo,
} from "../services/Jogo";

import {
  alternarBluetooth,
  bluetoothAtivo,
} from "../services/Bluetooth";

import JogadorCard from "../components/JogadorCard.vue";
import StatusConexao from "../components/StatusConexao.vue";

import {
  bluetooth,
  people,
} from "ionicons/icons";

const route = useRoute();
const router = useRouter();

const tipoPartida = computed(() => {
  return route.query.tipo === "bluetooth"
    ? "bluetooth"
    : "offline";
});

const partidaOffline = computed(() => {
  return tipoPartida.value === "offline";
});

const partidaBluetooth = computed(() => {
  return tipoPartida.value === "bluetooth";
});

function simular() {
  if (partidaOffline.value) {
    return;
  }

  const nomes = [
    "Bia",
    "Caio",
    "Duda",
    "Enzo",
    "Fê",
  ];

  const indice =
    estado.jogadores.length - 1;

  adicionarJogador(
    nomes[indice] || "Jogador",
  );
}

function podeIniciar(): boolean {
  if (partidaOffline.value) {
    return estado.jogadores.length >= 1;
  }

  if (partidaBluetooth.value) {
    return (
      estado.jogadores.length >= 2 &&
      bluetoothAtivo.value
    );
  }

  return false;
}

function iniciar() {
  if (!podeIniciar()) {
    return;
  }

  if (partidaOffline.value) {
    const iniciou =
      iniciarPartidaSolo();

    if (iniciou) {
      router.push(
        "/tabs/partidas/partida",
      );
    }

    return;
  }

  if (partidaBluetooth.value) {
    const iniciou =
      iniciarPartida();

    if (iniciou) {
      router.push(
        "/tabs/partidas/partida",
      );
    }
  }
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button
            default-href="/tabs/partidas"
          />
        </ion-buttons>

        <ion-title>
          Sala de espera
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col
            size="12"
            size-md="8"
            offset-md="2"
          >
            <ion-list inset>
              <ion-item lines="none">
                <ion-label>
                  <ion-note>
                    Sala de espera
                  </ion-note>

                  <ion-text>
                    <h1>
                      Sala de {{ estado.nome }}
                    </h1>
                  </ion-text>

                  <ion-note>
                    {{
                      partidaOffline
                        ? "Partida offline"
                        : "Partida via Bluetooth"
                    }}
                  </ion-note>
                </ion-label>

                <StatusConexao
                  v-if="partidaBluetooth"
                  slot="end"
                />
              </ion-item>
            </ion-list>

            <ion-card
              v-if="partidaBluetooth"
            >
              <ion-card-header>
                <ion-card-title>
                  Bluetooth
                </ion-card-title>

                <ion-card-subtitle>
                  {{
                    bluetoothAtivo
                      ? "Bluetooth ativo"
                      : "Bluetooth desligado"
                  }}
                </ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                <ion-text color="medium">
                  <p>
                    Somente dispositivos próximos.
                  </p>
                </ion-text>

                <ion-button
                  fill="outline"
                  expand="block"
                  @click="alternarBluetooth"
                >
                  <ion-icon
                    slot="start"
                    :icon="bluetooth"
                  />

                  {{
                    bluetoothAtivo
                      ? "Desativar Bluetooth"
                      : "Ativar Bluetooth"
                  }}
                </ion-button>
              </ion-card-content>
            </ion-card>

            <ion-card
              v-if="partidaOffline"
            >
              <ion-card-header>
                <ion-card-title>
                  Modo offline
                </ion-card-title>

                <ion-card-subtitle>
                  Solo
                </ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                <ion-text color="medium">
                  <p>
                    Você jogará contra três jogadores
                    controlados pelo computador.
                  </p>

                  <p>
                    Os bots serão adicionados
                    automaticamente ao iniciar a partida.
                  </p>
                </ion-text>
              </ion-card-content>
            </ion-card>

            <ion-card>
              <ion-card-header>
                <ion-card-title>
                  Jogadores
                  ({{ estado.jogadores.length }}/6)
                </ion-card-title>

                <ion-card-subtitle>
                  {{
                    partidaOffline
                      ? "1 jogador + 3 bots"
                      : "Mínimo de 2 jogadores"
                  }}
                </ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                <JogadorCard />

                <ion-text
                  v-if="partidaOffline"
                  color="medium"
                >
                  <p>
                    Você jogará contra Bot Ana,
                    Bot Bruno e Bot Carla.
                  </p>
                </ion-text>

                <ion-text
                  v-if="
                    partidaBluetooth &&
                    estado.jogadores.length < 2
                  "
                  color="medium"
                >
                  <p>
                    Aguardando mais um jogador...
                  </p>
                </ion-text>

                <ion-button
                  v-if="partidaBluetooth"
                  fill="clear"
                  expand="block"
                  @click="simular"
                  :disabled="
                    estado.jogadores.length >= 6
                  "
                >
                  <ion-icon
                    slot="start"
                    :icon="people"
                  />

                  Simular jogador próximo
                </ion-button>
              </ion-card-content>
            </ion-card>

            <ion-button
              expand="block"
              :disabled="!podeIniciar()"
              @click="iniciar"
            >
              {{
                partidaOffline
                  ? "Jogar sozinho"
                  : "Iniciar partida"
              }}
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>