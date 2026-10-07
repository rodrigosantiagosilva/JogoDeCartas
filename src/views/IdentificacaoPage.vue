
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { iniciarIdentificacao } from "../services/Jogo";

const router = useRouter();

const nome = ref("");

function continuar() {
  const nomeLimpo = nome.value.trim();

  if (!nomeLimpo) {
    return;
  }

  iniciarIdentificacao(nomeLimpo);

  router.push("/partidas");
}
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">

      <ion-list>

        <ion-item lines="none">
          <ion-label>
            <ion-note>
              Passo 1 de 3
            </ion-note>
          </ion-label>
        </ion-item>

        <ion-item lines="none">
          <ion-label>
            <ion-text>
              Como podemos te chamar?
            </ion-text>
          </ion-label>
        </ion-item>

        <ion-item lines="none">
          <ion-label>
            <ion-text color="medium">
              Seu nome aparecerá para os jogadores
              próximos.
            </ion-text>
          </ion-label>
        </ion-item>

      </ion-list>

      <ion-card>

        <ion-card-header>
          <ion-card-title>
            Seu nome
          </ion-card-title>
        </ion-card-header>

        <ion-card-content>

          <ion-input
            v-model="nome"
            label="Digite seu nome"
            label-placement="floating"
            placeholder="Ex.: Rodrigo"
            type="text"
            fill="outline"
            clear-input
          />

          <ion-button
            expand="block"
            class="ion-margin-top"
            :disabled="!nome.trim()"
            @click="continuar"
          >
            Continuar
          </ion-button>

        </ion-card-content>

      </ion-card>

    </ion-content>

  </ion-page>
</template>
