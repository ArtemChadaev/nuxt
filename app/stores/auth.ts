// stores/auth.ts
import { defineStore } from "pinia";
import { uuid } from "valibot";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as string | null,
    user: null as string | null,
    id: null as number | null,
  }),
  actions: {
    login(token: string, user: string, id: number) {
      console.log(token, user, id);
      this.token = token;
      this.user = user;
      this.id = id;
    },
    logout() {
      this.token = null;
      this.user = null;
      this.id = null;
    },
  },
  getters: {
    isLogged: (state) => !!state.token,
  },
});
