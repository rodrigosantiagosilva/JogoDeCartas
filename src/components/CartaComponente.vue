
<script setup lang="ts">
import type { Carta } from "../types/Carta";

defineProps<{
  carta: Carta;
  selecionada?: boolean;
}>();
</script>

<template>
  <div
    class="carta"
    :class="[
      carta.cor,
      {
        selected: selecionada,
      },
    ]"
  >
    <span class="valor">
      {{ carta.valor }}
    </span>

    <span class="naipe">
      {{ carta.naipe }}
    </span>

    <span class="valor">
      {{ carta.valor }}
    </span>
  </div>
</template>

<style scoped>
.carta {
  width: 80px;
  height: 115px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 8px;

  box-sizing: border-box;

  background: white;

  border: 2px solid #d0d0d0;
  border-radius: 10px;

  cursor: pointer;
  user-select: none;

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease;
}

.carta:hover {
  transform: translateY(-3px);
}

.carta.selected {
  transform: translateY(-8px);

  border-color: var(--ion-color-primary);

  box-shadow:
    0 5px 15px
    rgba(0, 0, 0, 0.2);
}

.carta.red {
  color: #d32f2f;
}

.carta.black {
  color: #222;
}

.valor {
  font-weight: 700;
  font-size: 16px;
}

.naipe {
  font-size: 32px;
  line-height: 1;
}
</style>
