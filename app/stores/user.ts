export const useUserStore = defineStore(
  'user',
  () => {
    const id = ref<number | null>(null)
    const name = ref<string | null>(null)
    const email = ref<string | null>(null)

    const logout = () => {
      id.value = null
      name.value = null
      email.value = null
    }

    return { id, name, email, logout }
  },
  {
    persist: {
      pick: ['id', 'name'],
    },
  },
)
