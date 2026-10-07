<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />

      <ion-tab-bar slot="bottom">
        <ion-tab-button
          tab="home"
          href="/tabs/home"
        >
          <ion-icon :icon="home" />
          <ion-label>Início</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="partidas"
          href="/tabs/partidas"
        >
          <ion-icon :icon="gameController" />
          <ion-label>Partidas</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="historico"
          href="/tabs/historico"
        >
          <ion-icon :icon="time" />
          <ion-label>Histórico</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/vue";

import {
  home,
  gameController,
  time,
} from "ionicons/icons";
</script>
