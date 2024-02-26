<template>
  <div class="einverstaendnisabfrage">
    <div id="einverstaendnisabfrage-title">{{ $t("app.einverstaendnisabfrage.title") }}</div>
    <div id="einverstaendnisabfrage-message">{{ $t("app.einverstaendnisabfrage.message") }}</div>
    <div id="einverstaendnisabfrage-message">
      <v-btn @click="$emit('update:value', true)">
        {{ $t("app.einverstaendnisabfrage.confirm") }}
      </v-btn>
      <v-btn>
        Standard
        <svg aria-hidden="true" class="m-button__icon">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps(['value'])
</script>