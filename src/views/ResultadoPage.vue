<script setup lang="ts">
import { useRouter } from "vue-router";

import {
  estado,
  novaPartida,
} from "../services/Jogo";

import {
  refresh,
  trophy,
} from "ionicons/icons";

const router = useRouter();

function novo() {
  novaPartida();

  router.push("/tabs/partidas");
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
          Resultado
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
                <ion-icon
                  slot="start"
                  :icon="trophy"
                  color="warning"
                />

                <ion-label>
                  <ion-note>
                    Partida encerrada
                  </ion-note>

                  <ion-text>
                    <h1>
                      {{
                        estado.resultado?.vencedor ===
                        estado.nome
                          ? "Você venceu!"
                          : "Boa partida."
                      }}
                    </h1>
                  </ion-text>

                  <ion-note>
                    {{ estado.resultado?.motivo }}
                  </ion-note>
                </ion-label>
              </ion-item>
            </ion-list>

            <ion-card>
              <ion-card-header>
                <ion-card-title>
                  Resultado
                </ion-card-title>
              </ion-card-header>

              <ion-list>
                <ion-item>
                  <ion-label>
                    <ion-note>
                      Vencedor
                    </ion-note>

                    <h2>
                      {{ estado.resultado?.vencedor }}
                    </h2>
                  </ion-label>

                  <ion-icon
                    slot="end"
                    :icon="trophy"
                    color="warning"
                  />
                </ion-item>

                <ion-item>
                  <ion-label>
                    <ion-note>
                      Penalizado
                    </ion-note>

                    <h2>
                      {{ estado.resultado?.penalizado }}
                    </h2>
                  </ion-label>
                </ion-item>

                <ion-item>
                  <ion-label>
                    <ion-note>
                      Motivo
                    </ion-note>

                    <h2>
                      {{ estado.resultado?.motivo }}
                    </h2>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-card>

            <ion-list inset>
              <ion-item lines="none">
                <ion-label>
                  <ion-button
                    expand="block"
                    @click="novo"
                  >
                    <ion-icon
                      slot="start"
                      :icon="refresh"
                    />

                    Nova partida
                  </ion-button>

                  <ion-button
                    fill="outline"
                    expand="block"
                    @click="
                      router.push('/tabs/historico')
                    "
                  >
                    Ver histórico
                  </ion-button>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>