<template>
  <v-app>
    <consent-query v-model="confirmConsent" />
    <wjh-input v-model="userData" />
  </v-app>
</template>

<script setup lang="ts">
import WjhInput from '@/components/WjhInput.vue';
import ConsentQuery from '@/components/ConsentQuery.vue';
import { ref } from 'vue'

const confirmConsent = ref(true)
const userData = ref({})
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
