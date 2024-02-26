<template>
  <v-app>
    <env-system-bar />

    <default-bar />

    <default-nav-drawer />

    <default-view />

    <v-snackbar
      v-for="(snackbar, idx) in getSnackbars.filter((s) => s.showing)"
      :key="snackbar.id"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :model-value="snackbar.showing"
      :style="`bottom: ${idx * 80 + 8}px`"
      :data-testid="'snackbar-' + snackbar.id"
      @update:model-value="closeSnackbar(snackbar)"
    >
      {{ snackbar.text }}
      <template #actions>
        <v-btn v-if="snackbar.timeout == -1" variant="text" @click="closeSnackbar(snackbar)">{{
          $t('actions.close')
        }}</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useNotificationsStore } from '@/store/notifications'
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import DefaultNavDrawer from './NavDrawer.vue'
import EnvSystemBar from './EnvSystemBar.vue'

export default defineComponent({
  components: {
    DefaultBar,
    DefaultView,
    DefaultNavDrawer,
    EnvSystemBar
  },
  data() {
    return {
      violations: [
        {
          fieldName: 'field',
          message: 'error'
        }
      ]
    }
  },
  computed: {
    ...mapState(useNotificationsStore, ['getSnackbars'])
  },
  methods: {
    ...mapActions(useNotificationsStore, ['closeSnackbar'])
  }
})
</script>
