import Vue from 'vue';
import Vuex from 'vuex';
import { createDirectStore } from 'direct-vuex';

import CONFIG from '../lib/config';

Vue.use(Vuex);

const loaded_login = localStorage.getItem(CONFIG.auth_key);

export interface RootState {
  auth_key: null | string;
}

interface Login {
  username: string;
  password: string;
}

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
} = createDirectStore({
  modules: {
  },
  state: {
    auth_key: loaded_login || null,
  } as RootState,
  mutations: {
    login(state, options: Login) {
      const base64_string = btoa(`${options.username}:${options.password}`);
      const auth_string = `Basic ${base64_string}`;
      localStorage.setItem(CONFIG.auth_key, auth_string);
      state.auth_key = auth_string;
    },
    logout(state) {
      localStorage.removeItem(CONFIG.auth_key);
      state.auth_key = null;
    },
  },
  getters: {
    logged_in(...args): boolean {
      // Issue with  rootGetterContext means need to set as `any`
      const { state } = rootGetterContext(args as any);
      return state.auth_key !== null;
    },
    auth_header(...args): null | { Authorization: string } {
      // Issue with  rootGetterContext means need to set as `any`
      const { state, getters } = rootGetterContext(args as any);
      const auth_key = state.auth_key;
      if (getters.logged_in) {
        return { Authorization: auth_key! };
      } else {
        return null;
      }
    },
  },
});

// Export the direct-store instead of the classic Vuex store.
export default store;

// The following exports will be used to enable types in the
// implementation of actions and getters.
export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
};

// The following lines enable types in the injected store '$store'.
export type AppStore = typeof store;
declare module 'vuex' {
  interface Store<S> {
    direct: AppStore;
  }
}
