<template>
  <v-dialog
    id="einverstaendnis-dialog"
    v-model="model"
    max-width="1200px"
    class="einverstaendnisabfrage"
    persistent
  >
    <v-card
      variant="flat"
      :title="$t('app.einverstaendnisabfrage.label')"
      @keyup.enter="confirm"
    >
      <v-card-text>
        <v-alert color="primary">
          <span>{{ $t("app.description") }}</span>
          <br />
          <span>{{ $t("app.haftungsausschluss") }}</span>
        </v-alert>
        <span>{{ $t("app.einverstaendnisabfrage.message") }}</span>
      </v-card-text>
      <v-card-actions id="einverstaendnisabfrage-message" class="justify-end">
        <v-btn @click="confirm" variant="flat" class="mx-4 mb-2">
          {{ $t("app.einverstaendnisabfrage.confirm") }}
          <svg aria-hidden="true" class="m-button__icon">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { defineModel, onMounted } from 'vue'

const model = defineModel<boolean>()

const confirm = () => {
  model.value = false;
  window.removeEventListener('keyup', enterListener);
}

const enterListener = (event : KeyboardEvent) => {
  if (event.key === "Enter") { 
    confirm();
  }
}

onMounted(() => {
  window.addEventListener('keyup', enterListener);
})
</script>