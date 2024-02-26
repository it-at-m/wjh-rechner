<template>
  <v-app-bar density="compact">
    <template #prepend>
      <v-app-bar-nav-icon @click.stop="uiStore.showDrawer(!uiStore.drawer)" />
      <router-link to="/">
        <v-img src="@/assets/logo-prod.png" height="48" width="32"></v-img>
      </router-link>
    </template>
    <router-link to="/" class="app-header-link">
      <v-app-bar-title class="font-weight-bold ml-2">
        <span class="rbs-red">{{ $t('app.name') }}</span>
      </v-app-bar-title>
    </router-link>
    <v-spacer />
    <!-- TODO (noch) nicht Vue/Vuetify 3 kompatible Version verfügbar
          <itm-appswitcher
          :uri="appswitcherBaseUrl"
          :tags="['global', 'rbs', 'rbs-kita']"
          />
        -->
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useUiStore } from '@/store/ui'

const uiStore = useUiStore()
</script>

<style scoped>
.app-bar {
  background-image: linear-gradient(
    90deg,
    rgb(var(--v-theme-primary-base)) 0%,
    rgb(var(--v-theme-primary-darken-2)) 90%
  );
}

.app-header-link {
  text-decoration: none;
}
</style>
