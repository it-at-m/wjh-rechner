<template>
  <v-app>
    <h2 class="px-4 pt-1">{{ $t("app.name") }}</h2>
    <einverstaendnisabfrage v-model="confirmConsent" />
    <wjh-eingabe v-model="userDataValue" :is-mobile="isMobile" />
    <a class="impressum" href="https://stadt.muenchen.de/infos/impressum-datenschutz.html" target="_blank">
      {{ $t("app.impressum") }}
    </a>
    <a class="github-link" href="https://github.com/it-at-m/wjh-rechner" target="_blank">
      <v-icon>mdi-git</v-icon>
    </a>
  </v-app>
</template>

<script setup lang="ts">
import WjhEingabe from '@/components/WjhEingabe.vue';
import Einverstaendnisabfrage from '@/components/Einverstaendnisabfrage.vue';
import { ref } from 'vue'
import { UserData } from './api/wjhTypes';

const confirmConsent = ref(true)
const userDataValue = ref(new UserData())

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
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

.impressum {
  position: fixed;
  bottom: 0px;
  left: 4px;
}

.github-link {
  position: fixed;
  bottom: 0px;
  right: 0px;
}
</style>
