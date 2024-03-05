<template>
  <v-stepper v-model="step" @keyup.enter="nextStep" :mobile="isMobile">
    <v-stepper-header>
        <v-stepper-item
          v-for="step in steps"
          :key="step.value"
          :value="step.value"
          :title="$t(`app.wjhEingabe.steps.${step.value}`)"
          :icon="step.icon"
          :edit-icon="step.editIcon ?? 'mdi-pencil'"
          complete-icon="mdi-check"
          :error="stepErrors[step.value]"
          :complete="getStepNumber(step.value) < stepNumber"
          :editable="getStepNumber(step.value) <= maxStepNumber"
        />
    </v-stepper-header>
    <v-stepper-window>
      <v-stepper-window-item value="grunddaten">
        <v-form v-model="grunddatenValid" @submit="$event.preventDefault()">
        <v-container class="py-2 px-0">
          <v-row>
            <v-col cols="12">
              <v-text-field
                class="required"
                prepend-inner-icon="mdi-currency-eur"
                :label="$t('app.wjhEingabe.familieneinkommen.label')"
                :placeholder="$t('app.wjhEingabe.familieneinkommen.label')"
                :hint="$t('app.wjhEingabe.familieneinkommen.description')"
                type="number"
                v-model.number="model.familieneinkommen"
                :rules="geldBetragRules"
              >
                <template v-slot:append-inner>
                  <v-tooltip
                    v-model="showFamilieneinkommenTooltip"
                    @click:outside="showFamilieneinkommenTooltip = false"
                    :text="$t('app.wjhEingabe.familieneinkommen.additionalHint')"
                    width="400px"
                    open-on-click
                    close-on-back
                    :open-on-hover="false"
                  >
                    <template v-slot:activator="{ props }">
                      <v-icon
                        v-bind="props"
                        @click="showFamilieneinkommenTooltip = true"
                      >mdi-information</v-icon>
                    </template>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                class="required"
                prepend-inner-icon="mdi-account-group"
                :label="$t('app.wjhEingabe.personenImHaushalt.label')"
                :placeholder="$t('app.wjhEingabe.personenImHaushalt.label')"
                type="number"
                :hint="$t('app.wjhEingabe.personenImHaushalt.description')"
                :rules="personenAnzahlRules"
                v-model.number="model.personenImHaushalt"
              />
            </v-col>
          </v-row>
          <v-row justify="end" class="px-3">
            <v-btn @click="grunddatenNext" :disabled="!grunddatenValid">
              {{ $t("app.wjhEingabe.steps.weiter") }}
              <svg aria-hidden="true" class="m-button__icon">
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </v-btn>
          </v-row>
        </v-container>
        </v-form>
      </v-stepper-window-item>
      <v-stepper-window-item value="wohnung">
        <v-form v-model="wohnungValid" @submit="$event.preventDefault()">
        <v-container class="py-2 px-0">
          <v-row>
            <v-col cols="12">
              <v-text-field
                class="required"
                prepend-inner-icon="mdi-currency-eur"
                :label="$t('app.wjhEingabe.miete.label')"
                :placeholder="$t('app.wjhEingabe.miete.label')"
                type="number"
                :hint="$t('app.wjhEingabe.miete.description')"
                v-model.number="model.miete"
                :rules="geldBetragRules"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                class="required"
                prepend-inner-icon="mdi-vector-square"
                :label="$t('app.wjhEingabe.groesseWohnung')"
                :placeholder="$t('app.wjhEingabe.groesseWohnung')"
                type="number"
                :hint="nebenkostenText"
                v-model.number="model.groesseWohnung"
                :rules="geldBetragRules"
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
                <br/>
              </v-alert>
            </v-col>
            <v-col cols="12">
              <span class="m-label">{{ $t("app.wjhEingabe.kostenWohnungGesamt") }}: {{ wohnkostenGesamtText }}</span>
              <span class="m-label">{{ $t("app.wjhEingabe.einkommensgrenze") }}: {{ einkommensgrenze }}€</span>
              <span class="m-label">{{ $t("app.wjhEingabe.uebersteigendesEinkommen") }}: {{ uebersteigendesEinkommen }}€</span>
            </v-col>
          </v-row>
          <v-row justify="space-between" class="px-3">
            <v-btn @click="step='grunddaten'">
              <svg aria-hidden="true" class="m-button__icon ml-0 mr-2">
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
              {{ $t("app.wjhEingabe.steps.zurueck") }}
            </v-btn>
            <v-btn @click="wohnungNext" :disabled="!wohnungValid">
              {{ $t("app.wjhEingabe.steps.weiter") }}
              <svg aria-hidden="true" class="m-button__icon">
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </v-btn>
          </v-row>
        </v-container>
        </v-form>
      </v-stepper-window-item>
      <v-stepper-window-item value="kitakosten">
        <v-form v-model="kitakostenValid" @submit="$event.preventDefault()">
        <v-container class="py-2 px-0">
          <v-row>
            <v-col cols="12">
              <v-text-field
                class="required"
                prepend-inner-icon="mdi-currency-eur"
                :label="$t('app.wjhEingabe.kitaKostenGeschwister.label')"
                :placeholder="$t('app.wjhEingabe.kitaKostenGeschwister.label')"
                type="number"
                :hint="$t('app.wjhEingabe.kitaKostenGeschwister.description')"
                v-model.number="model.kitaKostenGeschwister"
                :rules="geldBetragRules"
              />
            </v-col>
            <v-col cols="12">
              <v-alert type="info" color="primary">
                <b>{{ $t("app.wjhEingabe.uebersteigendesEinkommen") }}: </b>
                <span>{{ uebersteigendesEinkommenMinusGeschwister }}€</span>
                <div v-if="uebersteigendesEinkommenMinusGeschwister > 0">
                  <b>{{ $t("app.wjhEingabe.eigenanteil.label") }}: </b>
                  <span>{{ eigenanteil }}€</span>
                  <br />
                  <span>
                    {{ $t("app.wjhEingabe.eigenanteil.description") }}
                  </span>
                </div>
              </v-alert>
            </v-col>
          </v-row>
          <v-row justify="space-between" class="px-3">
            <v-btn @click="step='wohnung'">
              <svg aria-hidden="true" class="m-button__icon ml-0 mr-2">
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
              {{ $t("app.wjhEingabe.steps.zurueck") }}
            </v-btn>
            <v-btn @click="kitakostenNext" :disabled="!kitakostenValid">
              {{ $t("app.wjhEingabe.steps.weiter") }}
              <svg aria-hidden="true" class="m-button__icon">
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </v-btn>
          </v-row>
        </v-container>
        </v-form>
      </v-stepper-window-item>
      <v-stepper-window-item value="ergebnis">
        <v-form v-model="ergebnisValid" @submit="$event.preventDefault()">
        <v-container class="py-2 px-0">
          <v-row>
            <v-col cols="12" class="py-0">
              <h3 class="m-label">{{ $t("app.wjhErgebnis.title") }}</h3>
              <span class="m-hint">{{ $t("app.wjhErgebnis.hint") }}</span>
            </v-col>
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
                <span>{{ uebersteigendesEinkommenMinusGeschwister }}€</span>
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
                prepend-inner-icon="mdi-currency-eur"
                :label="$t('app.wjhEingabe.kitaKosten.label')"
                :placeholder="$t('app.wjhEingabe.kitaKosten.label')"
                type="number"
                v-model.number="model.kitaKosten"
                :rules="geldBetragRules"
              />
            </v-col>
            <v-col cols="12">
              <v-progress-linear
                :max="model.kitaKosten"
                :model-value="nichtGefoerderterBetrag"
                height="10em"
                bg-color="success"
                color="error"
                reverse
                bg-opacity="1"
              />
            </v-col>
          </v-row>
          <v-row justify="space-between">
            <v-col cols="auto">
              <span class="m-label">{{ $t("app.wjhErgebnis.foerderung") }}: {{ foerderung }}€</span>
            </v-col>
            <v-col cols="auto">
              <span class="m-label">{{ $t("app.wjhErgebnis.eigenanteil") }}: {{ nichtGefoerderterBetrag }}€</span>
            </v-col>
          </v-row>
          <v-row justify="space-between" class="px-3">
            <v-btn @click="resultBack">
              <svg aria-hidden="true" class="m-button__icon ml-0 mr-2">
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
              {{ $t("app.wjhEingabe.steps.zurueck") }}
            </v-btn>
          </v-row>
        </v-container>
        </v-form>
      </v-stepper-window-item>
    </v-stepper-window>
  </v-stepper>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { defineModel, ref, computed, watch } from 'vue'
import { UserData } from '@/api/wjhTypes'
import { getGrundbetragMitFamilie, getMietobergrenze } from '@/constants'
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

// Verwaltung des aktiven Schrittes im stepper
const steps = [
  { value: "grunddaten", icon: "mdi-cash", editIcon: "mdi-cash-edit" },
  { value: "wohnung", icon: "mdi-home", editIcon: "mdi-home-edit" },
  { value: "kitakosten", icon: "mdi-cash", editIcon: "mdi-cash-edit" },
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

const nextStep = () => {
  switch(step.value) {
    case "grunddaten": {
      grunddatenNext()
      break
    }
    case "wohnung": {
      wohnungNext()
      break
    }
    case "kitakosten": {
      kitakostenNext()
      break
    }
  }
}

// Funktion, die vom Schritt "grunddaten" aus weiter springt.
const grunddatenNext = () => {
  if(grunddatenValid.value) {
    if(!grundbetragAusreichend.value) {
      step.value = "wohnung";
    } else {
      step.value = "ergebnis";
    }
  }
}
// Funktion, die vom Schritt "wohnung" aus weiter springt.
const wohnungNext = () => {
  if (wohnungValid.value) {
    if (uebersteigendesEinkommen.value) {
      step.value = "kitakosten";
    } else {
      step.value = "ergebnis"
    }
  }
}
// Funktion, die vom Schritt "kitakosten" aus weiter springt.
const kitakostenNext = () => {
  if (kitakostenValid.value) {
    step.value = "ergebnis";
  }
}
// Funktion, die vom Schritt "ergebnis" aus zurück springt.
const resultBack = () => {
  if (grundbetragAusreichend.value) {
    step.value = "grunddaten"
  } else if (!uebersteigendesEinkommen.value) {
    // kein übersteigendes einkommen nach Schritt Wohnung
    step.value = "wohnung"
  } else {
    step.value = "kitakosten"
  }
}

// In der Eingabemaske verwendete Daten.
const model = defineModel<UserData>({ default: {}})
const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  }
});

const showFamilieneinkommenTooltip = ref(false);

// Grundbetrag der Einkommensgrenze inklusive des Familianzuschlags.
const grundbetragMitFamilie = computed(() => {
  return getGrundbetragMitFamilie(model.value.personenImHaushalt ?? 1);
})

// Obergrenze der Miete, die in die Einkommensgrenze einfließen kann.
const mietobergrenze = computed(() => {
  const mietobergrenze = getMietobergrenze(model.value.personenImHaushalt ?? 1);
  return mietobergrenze?.miete ?? 0;
})

// Nebenkosten, anhand der angegebenen Fläche
const nebenkostenWohnung = computed(() => {
  return Math.round((model.value.groesseWohnung ?? 0) * 1.2);
})

// Nebenkosten, anhand der angegebenen Fläche
const nebenkostenText = computed(() => {
  return t("app.wjhEingabe.nebenkostenWohnung.label", [nebenkostenWohnung.value]);
})

// Nebenkosten, anhand der angegebenen Fläche
const wohnkostenGesamtText = computed(() => {
  return `${verwendeteMiete.value}€ (${t("app.wjhEingabe.miete.shortLabel")}: ${mieteMitObergrenze.value}€ + ${t("app.wjhEingabe.nebenkostenWohnung.shortLabel")}: ${nebenkostenWohnung.value}€)`;
})

// Für die Miete tatsächlich verwendeter Wert unter Berücksichtigung der Mietobergrenze
const mieteMitObergrenze = computed(() => {
  return Math.min(mietobergrenze.value, model.value.miete ?? 0);
})

// Für die Wohnkosten tatsächlich verwendeter Wert
const verwendeteMiete = computed(() => {
  return mieteMitObergrenze.value + nebenkostenWohnung.value;
})

// Grenze des Einkommens, das nicht für Kita-Kosten belastet wird.
const einkommensgrenze = computed(() => {
  return verwendeteMiete.value + grundbetragMitFamilie.value;
})

// Anteil des Einkommens, der die Einkommensgrenze überschreitet.
const uebersteigendesEinkommen = computed(() => {
  return Math.max(0, (model.value.familieneinkommen ?? 0) - einkommensgrenze.value);
})

// Anteil des Einkommens, der die Einkommensgrenze überschreitet und nicht schon für andere Kita-Kosten verwendet wird.
const uebersteigendesEinkommenMinusGeschwister = computed(() => {
  return Math.max(0, (model.value.familieneinkommen ?? 0) - einkommensgrenze.value - (model.value.kitaKostenGeschwister ?? 0));
})

// Anteil des Einkommens, der für die Kita-Kosten belastet wird.
const eigenanteil = computed(() => {
  return Math.round(uebersteigendesEinkommenMinusGeschwister.value * 0.3);
})

// Anteil des Einkommens, der für die Kita-Kosten belastet wird.
const belastbaresEinkommen = computed(() => {
  return Math.max(0, eigenanteil.value);
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
  return grundbetragMitFamilie.value >= (model.value.familieneinkommen ?? 0);
})

// Gibt an, ob vorraussichtlich mit einer vollen Förderung gerechnet werden kann.
const volleFoerderung = computed(() => {
  return uebersteigendesEinkommenMinusGeschwister.value <= 0;
})

// Validierung
const grunddatenValid = ref(true);
const wohnungValid = ref(true);
const ergebnisValid = ref(true);
const kitakostenValid = ref(true);

const stepErrors = computed<{[key: string]: boolean}>(() => {
  return {
    "grunddaten": !grunddatenValid.value,
    "wohnung": !wohnungValid.value,
    "kitakosten": !kitakostenValid.value,
    "ergebnis": false
  }
});

const geldBetragRules = [
  (v : number) => !!v || v === 0 || t("validation.zahl"),
  (v : number) => v >= 0 || t("validation.positiveZahl"),
  (v : number) => v <= 1000000 || t("validation.maximalbetrag")
]

const personenAnzahlRules = [
  (v : number) => !!v || v === 0 || t("validation.zahl"),
  (v : number) => v >= 1 || t("validation.mindestensEins"),
  (v : number) => v <= 100 || t("validation.zuGross")
]
</script>