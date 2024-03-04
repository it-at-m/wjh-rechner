// Utilities
import { defineStore } from "pinia";
import {
  ApiError,
  OptimisticLockError,
  ForbiddenError,
  RedirectError,
  NotFoundError
} from "@/api/error";
import { v4 as uuid } from "uuid";

export const useNotificationsStore = defineStore("notificiations", {
  state: () => ({
    snackbars: [] as any[],
    errors: [] as any[],
    optLockError: {
      show: false,
      error: null as any
    },
    offline: false
  }),
  getters: {
    getSnackbars(state) {
      return state.snackbars;
    },
    getOptLockError(state) {
      return state.optLockError;
    },
    isOffline(state) {
      return state.offline;
    }
  },
  actions: {
    showOptLockError(error: any) {
      this.optLockError = {
        show: true,
        error: error
      };
    },
    closeOptLockError() {
      this.optLockError = {
        show: false,
        error: null
      };
    },
    closeSnackbar(snackbar: any) {
      this.snackbars = this.snackbars.map((item: any) => {
        if (item.id === snackbar.id) {
          item.showing = false;
        }
        return item;
      });
    },
    addSnackbar(snackbar: any) {
      snackbar.showing = true;
      snackbar.color = snackbar.color || "success";
      snackbar.timeout = snackbar.timeout || 4000;
      snackbar.id = uuid();
      this.snackbars = this.snackbars.concat(snackbar);
    },
    showWarningSnackbar(message: string) {
      const snackbar = {
        text: message,
        color: "warning"
      };
      this.addSnackbar(snackbar);
    },
    handleError(error: any) {
      // persist error in store (debugging)
      this.errors = this.errors.concat({
        timestamp: new Date(),
        error: error
      });
      if (error instanceof ApiError) {
        this.addSnackbar({
          color: "error",
          timeout: -1,
          text: `Unerwarteter Fehler aufgetreten: ${error.message}`
        });
      } else if (error instanceof OptimisticLockError) {
        this.showOptLockError({
          entity: error.entity,
          id: error.id
        });
      } else if (error instanceof ForbiddenError) {
        this.addSnackbar({
          color: "warning",
          timeout: 6000,
          text: "Keine Berechtigung"
        });
      } else if (error instanceof NotFoundError) {
        this.addSnackbar({
          color: "error",
          timeout: -1,
          text: "Der aufgerufene Datensatz existiert nicht."
        });
      } else if (error instanceof RedirectError) {
        this.setOffline();
      } else {
        // unkwown type -> rethrow
        throw error;
      }
    },
    setOffline() {
      if (!this.offline) {
        this.offline = true;
      }
    },
    closeOfflineDialog() {
      if (this.offline) {
        this.offline = false;
      }
    }
  }
});

