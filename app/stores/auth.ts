// stores/auth.ts
import {defineStore} from "pinia";
import {uuid} from "valibot";
import {Axios, AxiosResponse} from "axios";


export const useAuthStore = defineStore("auth", {
    state: () => ({
        refreshToken: null as string | null,
        accessToken: null as string | null,
        expiresAt: null as number | null,
    }),
    persist: true,
    actions: {
        setTokens(refreshToken: string, accessToken: string) {
            this.refreshToken = refreshToken
            this.accessToken = accessToken
            this.expiresAt = Date.now() + 10 * 60 * 1000
        },

        async newTokens() {
            if (!this.refreshToken)
                return this.logout()

            try {
                const config = useRuntimeConfig();
                const { $auth } = useNuxtApp();
                const response: AxiosResponse<{ refreshToken: string; accessToken: string}> = await $auth.post('refresh', event.data);
                this.refreshToken = response.refreshToken
                this.accessToken = response.accessToken
            } catch (error) {
                console.error("Ошибка оюновления токена", error)
                this.logout()
            }
        },

        logout() {
            this.refreshToken = null
            this.accessToken = null
            this.expiresAt = null
        },
    },
    getters: {
        isLogged: (state) => !!state.refreshToken,
        isTokenExpired: (state) => {
            if (!state.expiresAt) return true
            return Date.now() > state.expiresAt
        }
    },
});
