<template>
  <h1>{{ $t("app.name") }}</h1>
  <v-stepper v-model="step">
    <v-stepper-header>
        <v-stepper-item
          v-for="step in steps"
          :key="step.value"
          :value="step.value"
          :title="$t(`app.wjhEingabe.steps.${step.value}`)"
          :icon="step.icon"
          complete-icon="mdi-check"
          :complete="getStepNumber(step.value) < stepNumber"
          :editable="getStepNumber(step.value) <= maxStepNumber"
        />
    </v-stepper-header>
    <v-stepper-window>
      <v-stepper-window-item value="grunddaten" @keyup.enter="grunddatenNext">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                class="required"
                :label="$t('app.wjhEingabe.familieneinkommen.label')"
                :placeholder="$t('app.wjhEingabe.familieneinkommen.label')"
                :hint="$t('app.wjhEingabe.familieneinkommen.description')"
                type="number"
                v-model="model.familieneinkommen"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                class="required"
                :label="$t('app.wjhEingabe.personenImHaushalt.label')"
                :placeholder="$t('app.wjhEingabe.personenImHaushalt.label')"
                type="number"
                :hint="$t('app.wjhEingabe.personenImHaushalt.description')"
                v-model="model.personenImHaushalt"
              />
            </v-col>
            <v-col cols="12" v-if="grundbetragMitFamilie < model.familieneinkommen">
              <v-alert type="info" color="primary">
                <b>{{ $t("app.wjhEingabe.grundbetragMitFamilie.label") }}: </b>
                <span>{{ grundbetragMitFamilie }}€</span>
                <br />
                <span>
                  {{ $t("app.wjhEingabe.grundbetragMitFamilie.description") }}
                </span>
              </v-alert>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-btn @click="grunddatenNext">
              {{ $t("app.wjhEingabe.steps.weiter") }}
              <svg aria-hidden="true" class="m-button__icon">
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </v-btn>
          </v-row>
        </v-container>
      </v-stepper-window-item>
      <v-stepper-window-item value="wohnung" @keyup.enter="wohnungNext">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                class="required"
                :label="$t('app.wjhEingabe.miete.label')"
                :placeholder="$t('app.wjhEingabe.miete.label')"
                type="number"
                :hint="$t('app.wjhEingabe.miete.description')"
                v-model="model.miete"
              />
            </v-col>
            <v-col cols="12" v-if="mietobergrenze < (model.miete ?? 0)">
              <v-alert type="info" color="primary">
                <b>{{ $t("app.wjhEingabe.mietobergrenze.label") }}: </b>
                <span>{{ mietobergrenze }}€</span>
                <br />
                <span>
                  {{ $t("app.wjhEingabe.mietobergrenze.description") }}
                </span>
              </v-alert>
            </v-col>
            <v-col cols="12">
              <b>{{ $t("app.wjhEingabe.einkommensgrenze") }}: </b>
              <span>{{ einkommensgrenze }}€</span>
            </v-col>
            <v-col cols="12">
              <b>{{ $t("app.wjhEingabe.uebersteigendesEinkommen") }}: </b>
              <span>{{ uebersteigendesEinkommen }}€</span>
            </v-col>
            <v-col cols="12">
              <v-alert type="info" color="primary" v-if="uebersteigendesEinkommen">
                <b>{{ $t("app.wjhEingabe.eigenanteil.label") }}: </b>
                <span>{{ eigenanteil }}€</span>
                <br />
                <span>
                  {{ $t("app.wjhEingabe.eigenanteil.description") }}
                </span>
              </v-alert>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-btn @click="wohnungNext">
              {{ $t("app.wjhEingabe.steps.weiter") }}
              <svg aria-hidden="true" class="m-button__icon">
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </v-btn>
          </v-row>
        </v-container>
      </v-stepper-window-item>
      <v-stepper-window-item value="ergebnis">
        <v-container>
          <v-row>
            <v-col v-if="volleFoerderung">
              <v-alert type="success">
                {{ $t("app.wjhErgebnis.volleFoerderung") }}
              </v-alert>
            </v-col>
            <v-col cols="12" v-else>
              <v-alert type="info" color="primary">
                <span>{{ $t("app.wjhErgebnis.teilfoerderung") }}</span>
                <br />
                <b>{{ $t("app.wjhEingabe.uebersteigendesEinkommen") }}: </b>
                <span>{{ uebersteigendesEinkommen }}€</span>
                <br />
                <b>{{ $t("app.wjhEingabe.eigenanteil.label") }}: </b>
                <span>{{ eigenanteil }}€</span>
                <br />
                <span>
                  {{ $t("app.wjhEingabe.eigenanteil.description") }}
                </span>
              </v-alert>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                class="required"
                :label="$t('app.wjhEingabe.kitaKosten.label')"
                :placeholder="$t('app.wjhEingabe.kitaKosten.label')"
                type="number"
                v-model="model.kitaKosten"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                class="required"
                :label="$t('app.wjhEingabe.kitaKostenGeschwister.label')"
                :placeholder="$t('app.wjhEingabe.kitaKostenGeschwister.label')"
                type="number"
                :hint="$t('app.wjhEingabe.kitaKostenGeschwister.description')"
                v-model="model.kitaKostenGeschwister"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <b>{{ $t("app.wjhErgebnis.belastbaresEinkommen") }}: </b>
              <span>{{ belastbaresEinkommen }}€</span>
            </v-col>
            <v-col cols="12">
              <v-progress-linear
                :max="model.kitaKosten"
                :model-value="foerderung"
                height="10em"
                color="green"
                bg-color="red"
                bg-opacity="1"
              />
            </v-col>
          </v-row>
          <v-row justify="space-between">
            <v-col cols="auto">
              <b>{{ $t("app.wjhErgebnis.foerderung") }}: </b>
              <span>{{ foerderung }}€</span>
            </v-col>
            <v-col cols="auto">
              <b>{{ $t("app.wjhErgebnis.eigenanteil") }}: </b>
              <span>{{ nichtGefoerderterBetrag }}€</span>
            </v-col>
          </v-row>
        </v-container>
      </v-stepper-window-item>
    </v-stepper-window>
  </v-stepper>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { defineModel, ref, computed, watch } from 'vue'
import { UserData } from '@/api/wjhTypes'
import { grundbetrag, getGrundbetragMitFamilie, getMietobergrenze } from '@/constants'
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

// Verwaltung des aktiven Schrittes im stepper
const steps = [
  { value: "grunddaten", icon: "mdi-cash" },
  { value: "wohnung", icon: "mdi-home" },
  { value: "ergebnis", icon: "mdi-information" }
]
const step = ref("grunddaten")
const getStepNumber = (step : string) => {
  return steps.findIndex(s => s.value == step);
}
const stepNumber = computed(() : number => {
  return getStepNumber(step.value)
})
let maxStepNumber = stepNumber.value;
watch(stepNumber, (newValue : number) => {
  maxStepNumber = Math.max(newValue, maxStepNumber);
})

// Funktion, die vom Schritt "grunddaten" aus weiter springt.
const grunddatenNext = () => {
  if(grundbetragAusreichend.value) {
    step.value = "wohnung";
  } else {
    step.value = "ergebnis";
  }
}
// Funktion, die vom Schritt "wohnung" aus weiter springt.
const wohnungNext = () => {
  step.value = "ergebnis";
}

// In der Eingabemaske verwendete Daten.
const model = defineModel<UserData>({ default: {}})

// Grundbetrag der Einkommensgrenze inklusive des Familianzuschlags.
const grundbetragMitFamilie = computed(() => {
  return getGrundbetragMitFamilie(model.value.personenImHaushalt ?? 1);
})

// Obergrenze der Miete, die in die Einkommensgrenze einfließen kann.
const mietobergrenze = computed(() => {
  const mietobergrenze = getMietobergrenze(model.value.personenImHaushalt ?? 1);
  return mietobergrenze.miete;
})

// Für die Miete tatsächlich verwenteter Wert
const verwendeteMiete = computed(() => {
  return Math.min(mietobergrenze.value, model.value.miete ?? 0);
})

// Grenze des Einkommens, das nicht für Kita-Kosten belastet wird.
const einkommensgrenze = computed(() => {
  return verwendeteMiete.value + grundbetragMitFamilie.value;
})

// Anteil des Einkommens, der die Einkommensgrenze überschreitet.
const uebersteigendesEinkommen = computed(() => {
  return Math.max(0, (model.value.familieneinkommen ?? 0) - einkommensgrenze.value);
})

// Anteil des Einkommens, der für die Kita-Kosten belastet wird.
const eigenanteil = computed(() => {
  return Math.round(uebersteigendesEinkommen.value * 0.3);
})

// Anteil des Einkommens, der für die Kita-Kosten belastet wird.
const belastbaresEinkommen = computed(() => {
  return Math.max(0, eigenanteil.value - (model.value.kitaKostenGeschwister ?? 0));
})

// Anteil der Kitakosten, die vorraussichtlich selbst gezahlt werden müssen.
const nichtGefoerderterBetrag = computed(() => {
  return Math.min(belastbaresEinkommen.value, (model.value.kitaKosten ?? 0));
})
// Anteil der Kitakosten, der vorraussichtlich gefördert wird.
const foerderung = computed(() => {
  return Math.max(0, (model.value.kitaKosten ?? 0) - nichtGefoerderterBetrag.value);
})

// Status-Felder
// Gibt an, ob der grundbetragMitFamilie bereits hoch genug ist um eine komplette Förderung zu erhalten.
const grundbetragAusreichend = computed(() => {
  return grundbetragMitFamilie.value < (model.value.familieneinkommen ?? 0);
})

// Gibt an, ob vorraussichtlich mit einer vollen Förderung gerechnet werden kann.
const volleFoerderung = computed(() => {
  return uebersteigendesEinkommen.value <= 0;
})
</script>