<template>
  <v-app>
    <einverstaendnisabfrage v-model="confirmConsent" />
    <wjh-eingabe v-model="userDataValue" />
  </v-app>
</template>

<script setup lang="ts">
import WjhEingabe from '@/components/WjhEingabe.vue';
import Einverstaendnisabfrage from '@/components/Einverstaendnisabfrage.vue';
import { ref } from 'vue'
import { userData } from './api/wjhTypes';

const confirmConsent = ref(true)
const userDataValue = ref({})
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
