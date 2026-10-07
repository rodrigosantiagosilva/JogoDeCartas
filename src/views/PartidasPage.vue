<script setup lang="ts">
import { useRouter } from "vue-router";

import {
  bluetooth,
  addCircle,
  search,
  gameController,
  play,
} from "ionicons/icons";

const router = useRouter();

function criarPartidaOffline() {
  router.push("/tabs/partidas/sala?tipo=offline");
}

function procurarSalaBluetooth() {
  router.push(
    "/tabs/partidas/sala?tipo=bluetooth&modo=procurar",
  );
}

function criarSalaBluetooth() {
  router.push(
    "/tabs/partidas/sala?tipo=bluetooth&modo=criar",
  );
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Partidas
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
                    Escolha o tipo de partida
                  </ion-note>

                  <ion-text>
                    <h1>
                      Como deseja jogar?
                    </h1>
                  </ion-text>

                  <ion-text color="medium">
                    <p>
                      Escolha entre uma partida offline
                      ou uma partida com amigos.
                    </p>
                  </ion-text>
                </ion-label>
              </ion-item>
            </ion-list>

            <ion-card>
              <ion-card-header>
                <ion-card-title>
                  Jogar offline
                </ion-card-title>

                <ion-card-subtitle>
                  Jogue contra bots
                </ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                <ion-item lines="none">
                  <ion-icon
                    slot="start"
                    :icon="gameController"
                    color="primary"
                  />

                  <ion-label>
                    <ion-text>
                      Jogue sem internet e sem Bluetooth.
                    </ion-text>
                  </ion-label>
                </ion-item>

                <ion-button
                  expand="block"
                  @click="criarPartidaOffline"
                >
                  <ion-icon
                    slot="start"
                    :icon="play"
                  />

                  Jogar offline
                </ion-button>
              </ion-card-content>
            </ion-card>

            <ion-card>
              <ion-card-header>
                <ion-card-title>
                  Jogar com amigos
                </ion-card-title>

                <ion-card-subtitle>
                  Partida via Bluetooth
                </ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                <ion-item lines="none">
                  <ion-icon
                    slot="start"
                    :icon="bluetooth"
                    color="primary"
                  />

                  <ion-label>
                    <ion-text>
                      Encontre salas próximas sem precisar
                      de internet.
                    </ion-text>
                  </ion-label>
                </ion-item>

                <ion-button
                  expand="block"
                  @click="procurarSalaBluetooth"
                >
                  <ion-icon
                    slot="start"
                    :icon="search"
                  />

                  Procurar salas
                </ion-button>
              </ion-card-content>
            </ion-card>

            <ion-card>
              <ion-card-header>
                <ion-card-title>
                  Criar sala
                </ion-card-title>

                <ion-card-subtitle>
                  Crie uma sala para seus amigos entrarem
                </ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                <ion-button
                  expand="block"
                  @click="criarSalaBluetooth"
                >
                  <ion-icon
                    slot="start"
                    :icon="addCircle"
                  />

                  Criar nova sala
                </ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>