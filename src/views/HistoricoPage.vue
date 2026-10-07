<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import {
  listarPartidas,
  excluirPartida,
  limparHistorico,
} from "../services/Historico";

import type { Partida } from "../types/Partida";

import { trash } from "ionicons/icons";

const router = useRouter();

const partidas = ref<Partida[]>(listarPartidas());

const confirmar = ref(false);

function data(v: string) {
  return new Date(v).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function remover(id: string) {
  excluirPartida(id);
  partidas.value = listarPartidas();
}

function limpar() {
  limparHistorico();
  partidas.value = [];
  confirmar.value = false;
}

function abrirDetalhes(id: string) {
  router.push("/tabs/historico/" + id);
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Histórico</ion-title>

        <ion-buttons slot="end">
          <ion-button
            v-if="partidas.length"
            fill="clear"
            color="danger"
            @click="confirmar = true"
          >
            <ion-icon :icon="trash" />
          </ion-button>
        </ion-buttons>
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
            <ion-list lines="none">
              <ion-item>
                <ion-label>
                  <ion-note>
                    Memória local
                  </ion-note>

                  <ion-title>
                    Partidas anteriores
                  </ion-title>

                  <ion-text color="medium">
                    <p>
                      Disponível mesmo sem internet.
                    </p>
                  </ion-text>
                </ion-label>
              </ion-item>
            </ion-list>

            <ion-card v-if="!partidas.length">
              <ion-card-content>
                <ion-text color="medium">
                  <h2>
                    Nenhuma partida ainda
                  </h2>

                  <p>
                    Suas partidas aparecerão aqui.
                  </p>
                </ion-text>
              </ion-card-content>
            </ion-card>

            <ion-card
              v-for="p in partidas"
              :key="p.id"
              button
              @click="abrirDetalhes(p.id)"
            >
              <ion-card-content>
                <ion-item lines="none">
                  <ion-label>
                    <ion-text>
                      <h2>
                        {{ data(p.fim) }}
                      </h2>
                    </ion-text>

                    <ion-note>
                      {{
                        p.jogadores
                          .map((j) => j.nome)
                          .join(" · ")
                      }}
                    </ion-note>

                    <ion-text color="primary">
                      <p>
                        {{ p.resultadoLocal }}
                      </p>
                    </ion-text>
                  </ion-label>

                  <ion-badge
                    slot="end"
                    color="medium"
                  >
                    {{ p.status }}
                  </ion-badge>
                </ion-item>

                <ion-button
                  fill="clear"
                  color="danger"
                  @click.stop="remover(p.id)"
                >
                  <ion-icon
                    slot="start"
                    :icon="trash"
                  />

                  Excluir
                </ion-button>
              </ion-card-content>
            </ion-card>

            <ion-alert
              :is-open="confirmar"
              header="Limpar histórico?"
              message="Todas as partidas serão removidas."
              :buttons="[
                {
                  text: 'Cancelar',
                  role: 'cancel',
                },
                {
                  text: 'Limpar',
                  role: 'destructive',
                  handler: limpar,
                },
              ]"
              @didDismiss="confirmar = false"
            />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>