<template>
  <v-app>
    <einverstaendnisabfrage />
    <home />
  </v-app>
</template>

<script setup lang="ts">
import Home from '@/components/Home.vue';
import Einverstaendnisabfrage from '@/components/Einverstaendnisabfrage.vue';
import { ref } from 'vue'

const confirmConsent = ref(false)
</script>

<style>
.pointer {
  cursor: pointer;
}

.rbs-red {
  color: #ff0000;
}

.rbs-yellow {
  color: #ffcc00;
}

.table-striped tbody tr:nth-of-type(odd) td {
  background-color: rgba(var(--v-theme-surface-variant), 0.035) !important;
}
</style>
