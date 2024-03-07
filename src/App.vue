<template>
  <v-app id="wjh-rechner-app">
    <h2 class="px-4 pt-1">{{ $t('app.name') }}</h2>
    <einverstaendnisabfrage v-model="confirmConsent" />
    <wjh-eingabe v-model="userDataValue" :is-mobile="isMobile" :is-active="!confirmConsent" />
    <a class="impressum" :href="impressLink" target="_blank">
      {{ $t('app.impressum') }}
    </a>
    <a class="github-link" :title="$t('app.repository')" :href="githubRepoLink" target="_blank">
      <v-img :src="githubImgUrl" height="24" width="24" />
    </a>
  </v-app>
</template>

<script setup lang="ts">
import { githubRepoLink, impressLink } from '@/constants'
import WjhEingabe from '@/components/WjhEingabe.vue'
import Einverstaendnisabfrage from '@/components/Einverstaendnisabfrage.vue'
import { ref } from 'vue'
import { UserData } from './api/wjhTypes'
import githubImgUrl from '@/assets/github-mark.png'

const confirmConsent = ref(true)
const userDataValue = ref(new UserData())

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
)
</script>

<style>
#wjh-rechner-app {
  color: #3a5368;
}

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
  bottom: 4px;
  left: 4px;
}

.github-link {
  position: fixed;
  bottom: 4px;
  right: 4px;
}
</style>
