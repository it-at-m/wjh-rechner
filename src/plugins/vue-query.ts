import {
    VueQueryPlugin,
    VueQueryPluginOptions,
    QueryCache
  } from "@tanstack/vue-query";
  import { useNotificationsStore } from "@/store/notifications";
  
  const vueQueryPluginOptions: VueQueryPluginOptions = {
    queryClientConfig: {
      queryCache: new QueryCache({
        onError: (err) => {
          useNotificationsStore().handleError(err);
        }
      }),
      defaultOptions: {
        mutations: {
          onError: (err) => {
            useNotificationsStore().handleError(err);
          }
        }
      }
    }
  };
  
  export default {
    VueQueryPlugin,
    vueQueryPluginOptions
  };
  