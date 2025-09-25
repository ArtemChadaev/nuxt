// export const useTokenStore = defineStore("token", {
//     state: () => ({
//         refreshToken: string | null,
//         accessToken: string | null,
//         expiresAt: number | null,
//     }),
//     persist: true,
//     actions: {
//         setTokens(refreshToken: string, accessToken: string) {
//             this.refreshToken = refreshToken
//             this.accessToken = accessToken
//             this.expiresAt = Date.now() + 10 * 60 * 1000
//         },
//
//         logout() {
//             this.refreshToken = null
//             this.accessToken = null
//             this.expiresAt = null
//         },
//     },
//     getters: {
//         isTokenExpired: (state) => {
//             if (!state.expiresAt) return true
//             return Date.now() > state.expiresAt
//         }
//     },
// });

export const useTokenStore = defineStore(
    "token",
    () =>{
    const refreshToken = ref<string | null>(null)
    const accessToken = ref<string | null>(null)
    const expiresAt = ref<number | null>(null)

    const setTokens = (refresh: string, access: string) => {
        refreshToken.value = refresh
        accessToken.value = access
        expiresAt.value = Date.now() + 10 * 60 * 1000
    }

    const logout = () => {
        refreshToken.value = null
        accessToken.value = null
        expiresAt.value = null
    }

    const isTokenExpired = computed(() => {
        if(!expiresAt.value) return true
        return Date.now() > expiresAt.value
    })

    return
},
{
    persist: true,
})