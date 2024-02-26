<template>
  <v-container>
    <v-row>
      <h1>Lostopf</h1>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="mail"
          type="email"
          class="required"
          label="Mail Adresse"
          placeholder="Placeholder"
          hint="Optional helper Text"
        />
      </v-col>
      <v-col>
        <v-btn @click="sendToServer">
          Code einfordern
          <svg aria-hidden="true" class="m-button__icon">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-divider />
</template>
<script async setup lang="ts">
import { getCode } from '@/api/teilnehmer'
import { GetCodeDto } from '@/api/generatedTypes'
import { ref } from 'vue'
import { useNotificationsStore } from '@/store/notifications'
import { topfName } from '@/constants'

// mapped state from store
const notificationsStore = useNotificationsStore()
const mail = ref<string>()

async function sendToServer() {
  let payload = new GetCodeDto()
  payload.mail = mail.value
  payload.topfName = topfName
  await getCode(payload).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      useNotificationsStore().addSnackbar({
        text: 'Wenn ihre Mail im System hinterlegt ist, erhalten sie einen Code an diese Mailadresse',
        timeout: -1
      })
    }
  })
}
</script>
