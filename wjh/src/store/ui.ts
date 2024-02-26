// Utilities
import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    drawer: true
  }),
  getters: {},
  actions: {
    showDrawer(show: boolean) {
      this.drawer = show;
    }
  }
});
