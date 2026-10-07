<script setup lang="ts">
import { useRouter } from "vue-router";

import {
  time,
  play,
  bluetooth,
  gameController,
} from "ionicons/icons";

const router = useRouter();
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Burro</ion-title>

        <ion-buttons slot="end">
          <ion-button
            @click="router.push('/tabs/historico')"
          >
            <ion-icon :icon="time" />
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
            <ion-list inset>
              <ion-item lines="none">
                <ion-icon
                  slot="start"
                  :icon="gameController"
                  color="primary"
                />

                <ion-label>
                  <ion-note>
                    Jogo de cartas · Offline
                  </ion-note>

                  <ion-text>
                    <h1>
                      Burro, sem internet.
                    </h1>
                  </ion-text>

                  <ion-text color="medium">
                    <p>
                      Monte seu grupo de quatro cartas
                      e passe a próxima.
                      Jogue perto dos seus amigos
                      via Bluetooth.
                    </p>
                  </ion-text>
                </ion-label>
              </ion-item>
            </ion-list>

            <ion-card>
              <ion-card-header>
                <ion-card-title>
                  Como jogar?
                </ion-card-title>

                <ion-card-subtitle>
                  Jogue com seus amigos sem internet.
                </ion-card-subtitle>
              </ion-card-header>

              <ion-list>
                <ion-item>
                  <ion-icon
                    slot="start"
                    :icon="bluetooth"
                    color="primary"
                  />

                  <ion-label>
                    <h2>Bluetooth</h2>

                    <ion-note>
                      Conecte-se a jogadores próximos.
                    </ion-note>
                  </ion-label>
                </ion-item>

                <ion-item>
                  <ion-icon
                    slot="start"
                    :icon="gameController"
                    color="success"
                  />

                  <ion-label>
                    <h2>Partida offline</h2>

                    <ion-note>
                      Não é necessário estar conectado
                      à internet.
                    </ion-note>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-card>

            <ion-list inset>
              <ion-item lines="none">
                <ion-label>
                  <ion-button
                    expand="block"
                    @click="router.push('/identificacao')"
                  >
                    <ion-icon
                      slot="start"
                      :icon="play"
                    />

                    Começar partida
                  </ion-button>

                  <ion-button
                    fill="outline"
                    expand="block"
                    @click="router.push('/tabs/historico')"
                  >
                    <ion-icon
                      slot="start"
                      :icon="time"
                    />

                    Histórico
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