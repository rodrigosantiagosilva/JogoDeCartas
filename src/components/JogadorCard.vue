
<script setup lang="ts">
import { estado } from "../services/Jogo";
</script>
<template>
  <ion-card
    v-for="(j, i) in estado.jogadores"
    :key="j.id"
    :color="
      i === estado.turno
        ? 'primary'
        : undefined
    "
  >
    <ion-card-content>
      <ion-grid>
        <ion-row class="ion-align-items-center">
          <ion-col size="2">
            <ion-avatar>
              <ion-label>
                {{ j.nome.charAt(0).toUpperCase() }}
              </ion-label>
            </ion-avatar>
          </ion-col>

          <ion-col>
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
                  j.nome.startsWith("Bot ")
                    ? "Computador"
                    : j.anfitriao
                      ? "Anfitrião"
                      : "Jogador"
                }}
              </ion-note>
            </ion-label>
          </ion-col>

          <ion-col size="auto">
            <ion-badge
              v-if="i === estado.turno"
              color="success"
            >
              Vez
            </ion-badge>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>
