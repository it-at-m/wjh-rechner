import { config } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import vuetify from './src/plugins/vuetify'
import { I18nOptions, createI18n } from 'vue-i18n'
const datetimeFormats: I18nOptions['datetimeFormats'] = {
  // feste Zeitzone für Tests
  de: {
    // TT.MM.JJJJ
    short: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC'
    },
    // TT.MM.JJJJ HH24:MM
    long: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    },
    // TT.MM.JJJJ HH24:MM:SS
    timestamp: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC'
    }
  }
}
const i18n = createI18n({
  legacy: false,
  locale: 'de',
  fallbackLocale: 'de',
  messages: {
    // keine Message Keys in Vitest Tests (sind dort egal)
    de: {}
  },
  datetimeFormats: datetimeFormats
})
config.global.plugins = [vuetify, createTestingPinia(), i18n]

// needed by Vuetify
global.CSS = { supports: () => false, escape: () => '' }
