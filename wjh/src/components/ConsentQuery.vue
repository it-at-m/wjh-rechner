<template>
  <v-dialog v-model="model" width="auto" class="consentQuery" persistent>
    <v-card
      variant="flat"
      :border="20"
      :title="$t('app.consentQuery.title')"
      :text="$t('app.consentQuery.message')"
    >
      <v-card-actions id="consentQuery-message">
        <v-btn @click="confirm" variant="muenchen" color="white">
          {{ $t("app.consentQuery.confirm") }}
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
import {defineModel} from 'vue'

const model = defineModel()

const confirm = () => {
  model.value = false;
}
</script>