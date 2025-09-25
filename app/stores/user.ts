export const useUserStore = defineStore("user", () => {
    const id = ref<number | null>(null)
    const name = ref<string | null>(null)
    const email = ref<string | null>(null)

    const logout = () => {
        id.value = null
        name.value = null
        email.value = null
    }

    const isLogged = computed(() => !!id.value)

    return {id, name, email, isLogged, logout}
},{
    persist: {
        pick: ['id', 'name'],
    },
})