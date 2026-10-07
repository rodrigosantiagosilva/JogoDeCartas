<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import { listarPartidas } from "../services/Historico";

const route = useRoute();

const partida = computed(() =>
  listarPartidas().find(
    (p) => p.id === route.params.id,
  ),
);

function formatarData(data: string) {
  return new Date(data).toLocaleString("pt-BR");
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/historico" />
        </ion-buttons>

        <ion-title>Detalhes da partida</ion-title>
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
            <ion-list
              v-if="partida"
              lines="none"
            >
              <ion-item>
                <ion-label>
                  <ion-note>
                    {{
                      formatarData(partida.inicio)
                    }}
                    →
                    {{
                      formatarData(partida.fim)
                    }}
                  </ion-note>

                  <ion-title>
                    Detalhes da partida
                  </ion-title>
                </ion-label>
              </ion-item>
            </ion-list>

            <ion-card v-if="partida">
              <ion-card-header>
                <ion-card-title>
                  Resultado
                </ion-card-title>
              </ion-card-header>

              <ion-card-content>
                <ion-text color="primary">
                  <h1>
                    {{ partida.resultadoLocal }}
                  </h1>
                </ion-text>

                <ion-text>
                  <p>
                    {{ partida.motivo }}
                  </p>
                </ion-text>
              </ion-card-content>
            </ion-card>

            <ion-card v-if="partida">
              <ion-card-header>
                <ion-card-title>
                  Informações
                </ion-card-title>
              </ion-card-header>

              <ion-list>
                <ion-item>
                  <ion-label>
                    <ion-note>Vencedor</ion-note>
                    <h2>
                      {{ partida.vencedor }}
                    </h2>
                  </ion-label>
                </ion-item>

                <ion-item>
                  <ion-label>
                    <ion-note>Penalizado</ion-note>
                    <h2>
                      {{ partida.penalizado }}
                    </h2>
                  </ion-label>
                </ion-item>

                <ion-item>
                  <ion-label>
                    <ion-note>Rodadas</ion-note>
                    <h2>
                      {{ partida.rodadas }}
                    </h2>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-card>

            <ion-card v-if="partida">
              <ion-card-header>
                <ion-card-title>
                  Ordem dos jogadores
                </ion-card-title>
              </ion-card-header>

              <ion-list>
                <ion-item
                  v-for="j in partida.jogadores"
                  :key="j.id"
                >
                  <ion-avatar slot="start">
                    <ion-text color="primary">
                      <h2>
                        {{ j.nome[0] }}
                      </h2>
                    </ion-text>
                  </ion-avatar>

                  <ion-label>
                    {{ j.nome }}
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-card>

            <ion-card v-if="!partida">
              <ion-card-content>
                <ion-text color="medium">
                  <h2>
                    Partida não encontrada.
                  </h2>
                </ion-text>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>