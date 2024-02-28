<template>
  <v-dialog v-model="model" width="70%" class="einverstaendnisabfrage" persistent>
    <v-card
      variant="flat"
      :title="$t('app.einverstaendnisabfrage.label')"
    >
      <v-card-text>
        <span>{{ $t("app.einverstaendnisabfrage.message") }}</span>
      </v-card-text>
      <v-card-actions id="einverstaendnisabfrage-message" class="justify-end">
        <v-btn @click="confirm" variant="flat">
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
import { defineModel } from 'vue'

const model = defineModel<boolean>()

const confirm = () => {
  model.value = false;
}
</script>