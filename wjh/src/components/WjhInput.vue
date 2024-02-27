<template>
  <v-stepper v-model="step">
    <template v-slot:default="{ prev, next }">
    <v-stepper-header>
        <v-stepper-item
          title="Grunddaten"
          value="baseData"
          icon="mdi-cash"
        />
        <v-stepper-item
          title="Einkommensgrenzen"
          value="grenzen"
          icon="mdi-cash"
        />
    </v-stepper-header>

    <v-stepper-window>
      <v-stepper-window-item
        value="baseData"
      >
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                class="required"
                label="Familieneinkommen Netto"
                placeholder="Familieneinkommen Netto"
                type="number"
                v-model="model.familyIncome"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                class="required"
                label="Familienmitglieder"
                placeholder="Familienmitglieder"
                type="number"
                v-model="model.familyMembers"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                class="required"
                label="Wohnungsgröße (qm)"
                placeholder="Wohnungsgröße (qm)"
                type="number"
                v-model="model.appartementSize"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-stepper-window-item>
      <v-stepper-window-item
        value="grenzen"
      >
        JKLO
      </v-stepper-window-item>
    </v-stepper-window>

    <v-stepper-actions
      @click:prev="prev"
      @click:next="next"
    />
    </template>
  </v-stepper>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { defineModel, ref } from 'vue'
import { userData } from '@/api/wjhTypes'

const model = defineModel<userData>({ default: {}})
const step = ref("einkommen")
</script>