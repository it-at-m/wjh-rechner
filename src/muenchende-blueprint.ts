import {Blueprint, IconSet} from "vuetify";
import {mdi} from "vuetify/iconsets/mdi";

export const muenchendeBlueprint: Blueprint = {
  defaults: {
    global: {
      rounded: 0,
      elevation: 0
    },

    VBtn: {
      color: 'primary',
      class: 'mclass text-none m-button m-button--primary m-button--animated-right',
      height: 48,
      rounded: 0,
    },
    VCheckbox: {
      class: 'mclass',
      trueIcon: "mdi-checkbox-blank",
      color: 'primary'
    },
    VRadioGroup: {
      class: 'mclass',
      color: 'primary',
    },
    VTextField: {
      class: 'mclass',
      color: 'primary',
      variant: 'outlined',
      persistentPlaceholder: true,
      persistentHint: true
    },
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      'mdi': mdi as IconSet,
    },
  },
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#005A9F',
          'primary-darken-1': '#004376',
          'primary-lighten-1': '#337BB2',

          'neutral-grey': '#3a5368',
          'neutral-gray-light': '#617586',
          'neutral-gray-x-light': '#9CA8B3',
          'neutral-beau-blue': '#BDD4EA',
          'neutral-beau-blue-light': '#E5EEF5',
          'neutral-beau-blue-x-light': '#F2F6FA',

          secondary: '#1B98D5',
          'secondary-darken-1': '#F50057',
          'secondary-lighten-1': '#FF80AB',

          accent: '#FFE400',
          error: '#984447',
          success: '#3A7F53'
        },
      },
    },
  },
}
