<script setup lang="ts">
import { bluetooth, wifi } from "ionicons/icons";
import { bluetoothAtivo } from "../services/Bluetooth";
</script>
<template>
  <span class="pill" :class="{ off: !bluetoothAtivo }"
    ><ion-icon :icon="bluetoothAtivo ? bluetooth : wifi" />
    {{ bluetoothAtivo ? "Bluetooth ativo" : "offline" }}</span
  >
</template>
