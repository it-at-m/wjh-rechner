<template>
  <v-navigation-drawer v-model:model-value="uiStore.drawer" width="290" color="surface-darken-1">
    <v-list density="compact" nav>
      <v-list-subheader>
        <span class="pr-3">{{ $t('nav.benutzer') }}</span>
        <v-divider />
      </v-list-subheader>
    </v-list>
    <v-list-item
      density="compact"
      link
      :to="{ name: 'home' }"
      exact
      data-testid="nav-item-start"
      class="small-nav-item"
    >
      <template #prepend>
        <v-icon size="x-small">mdi-home-account</v-icon>
      </template>
      <v-list-item-title>{{ $t('nav.start') }}</v-list-item-title>
    </v-list-item>
    <v-list-item
      density="compact"
      link
      :to="{ name: 'lostopf' }"
      exact
      data-testid="nav-item-start"
      class="small-nav-item"
    >
      <template #prepend>
        <v-icon size="x-small">mdi-ticket-account</v-icon>
      </template>
      <v-list-item-title>lostopf</v-list-item-title>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useUiStore } from '@/store/ui'

const uiStore = useUiStore()
</script>

<style scoped>
.small-nav-item {
  min-height: 20px;
}
</style>
