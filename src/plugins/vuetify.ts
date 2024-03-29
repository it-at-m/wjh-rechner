/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import {Blueprint, createVuetify} from 'vuetify'
import {muenchendeBlueprint} from "@/muenchende-blueprint";

export default createVuetify({
  blueprint: muenchendeBlueprint as Blueprint,
})
