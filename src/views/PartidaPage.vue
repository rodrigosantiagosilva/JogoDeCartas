<script setup lang="ts">
import { useRouter } from "vue-router";

import {
  arrowBack,
  checkmarkCircle,
} from "ionicons/icons";

import {
  estado,
  maoLocal,
  minhaVez,
  proximoJogador,
  jogadorAnterior,
  cartaSelecionada,
  selecionarCarta,
  passarCarta,
} from "../services/Jogo";

const router = useRouter();

async function passar() {
  if (estado.processandoBot) {
    return;
  }

  const resultado = await passarCarta();

  if (
    resultado &&
    estado.resultado
  ) {
    router.push("/resultado");
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
          Partida
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
                    Rodada {{ estado.rodada }}
                  </ion-note>

                  <ion-text>
                    <h1>
                      {{
                        minhaVez
                          ? "Sua vez"
                          : "Vez de " +
                            estado.jogadores[
                              estado.turno
                            ]?.nome
                      }}
                    </h1>
                  </ion-text>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-label>
                  <ion-text>
                    <h2>
                      {{
                        minhaVez
                          ? "Escolha uma carta para passar"
                          : "Aguarde o próximo jogador"
                      }}
                    </h2>
                  </ion-text>

                  <ion-note>
                    {{
                      minhaVez
                        ? "Você passa para " +
                          proximoJogador?.nome +
                          "."
                        : "A carta será passada em ordem."
                    }}
                  </ion-note>
                </ion-label>
              </ion-item>
            </ion-list>

            <ion-card>
              <ion-card-header>
                <ion-card-title>
                  Sua mão · {{ maoLocal.length }} cartas
                </ion-card-title>

                <ion-card-subtitle>
                  Recebe de
                  {{ jogadorAnterior?.nome || "ninguém" }}
                </ion-card-subtitle>
              </ion-card-header>

              <ion-list>
                <ion-item
                  v-for="c in maoLocal"
                  :key="c.id"
                  button
                  :color="
                    cartaSelecionada?.id === c.id
                      ? 'primary'
                      : undefined
                  "
                  @click="selecionarCarta(c)"
                >
                  <ion-label>
                    <ion-text
                      :color="
                        cartaSelecionada?.id === c.id
                          ? 'light'
                          : c.cor === 'red'
                            ? 'danger'
                            : 'dark'
                      "
                    >
                      <h2>
                        {{ c.valor }} {{ c.naipe }}
                      </h2>
                    </ion-text>

                    <ion-note
                      :color="
                        cartaSelecionada?.id === c.id
                          ? 'light'
                          : undefined
                      "
                    >
                      {{
                        cartaSelecionada?.id === c.id
                          ? "Carta selecionada"
                          : "Toque para selecionar"
                      }}
                    </ion-note>
                  </ion-label>

                  <ion-icon
                    v-if="
                      cartaSelecionada?.id === c.id
                    "
                    slot="end"
                    :icon="checkmarkCircle"
                  />
                </ion-item>
              </ion-list>

              <ion-card-content>
                <ion-button
                  expand="block"
                  :disabled="
                    !cartaSelecionada ||
                    !minhaVez ||
                    estado.processandoBot
                  "
                  @click="passar"
                >
                  <ion-icon
                    slot="start"
                    :icon="arrowBack"
                  />

                  Confirmar e passar
                </ion-button>
              </ion-card-content>
            </ion-card>

            <ion-card>
              <ion-card-header>
                <ion-card-title>
                  Ordem da mesa
                </ion-card-title>
              </ion-card-header>

              <ion-list>
                <ion-item
                  v-for="(j, i) in estado.jogadores"
                  :key="j.id"
                  :color="
                    i === estado.turno
                      ? 'primary'
                      : undefined
                  "
                >
                  <ion-label>
                    <h2>
                      {{ j.nome }}
                    </h2>

                    <ion-note
                      :color="
                        i === estado.turno
                          ? 'light'
                          : undefined
                      "
                    >
                      {{
                        i === estado.turno
                          ? "É a vez deste jogador"
                          : "Aguardando"
                      }}
                    </ion-note>
                  </ion-label>

                  <ion-badge
                    slot="end"
                    :color="
                      i === estado.turno
                        ? 'success'
                        : 'medium'
                    "
                  >
                    {{
                      i === estado.turno
                        ? "Vez"
                        : "Aguardando"
                    }}
                  </ion-badge>
                </ion-item>
              </ion-list>
            </ion-card>

            <ion-card
              v-if="
                estado.modoSolo &&
                estado.processandoBot
              "
            >
              <ion-card-content>
                <ion-text color="primary">
                  <p>
                    O bot está pensando...
                  </p>
                </ion-text>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>