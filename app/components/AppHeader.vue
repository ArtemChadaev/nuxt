<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import { readonly } from 'vue'

const userStore = useTokenStore()
const { id, name } = readonly(userStore)
const items = computed(() => {
  const dropdownItems: DropdownMenuItem = [
    {
      label: 'Профиль',
      icon: 'i-lucide-user-pen',
      to: `/profile/${id}`,
    },
    {
      label: 'Подписка',
      icon: 'i-lucide-user-star',
      to: `/profile/${id}/star`,
    },
    {
      label: 'Настройки',
      icon: 'i-lucide-user-cog',
      to: `/profile/${id}/settings`,
    },
    {
      label: 'Выход',
      icon: 'ic-baseline-exit-to-app',
      color: 'error',
      onClick: () => {
        userStore.logout()
      },
    },
  ]
  return dropdownItems
})
</script>

<template>
  <div
    class="flex justify-between items-center border rounded-2xl px-5 bg-emerald-50"
  >
    <div>
      <UButton
        label="Home"
        icon="lucide:home"
        color="info"
        variant="ghost"
        size="xl"
        to="/"
      />
    </div>
    <UButton
        label="Игры"
        color="info"
        variant="ghost"
        size="xl"
        to="/game"
        class="text-center"
      />
    <div>
      <UDropdownMenu v-if="userStore.isLogged" :items="items" size="xl">
        <UButton
          :label="!!name ? name : 'Профиль'"
          trailing-icon="i-lucide-user"
          color="info"
          variant="ghost"
          size="xl"
        />
      </UDropdownMenu>
      <div v-else>
        <UButton
            label="Войти или Зарегистрироваться"
            icon="i-clock"
            color="info"
            variant="ghost"
            size="xl"
            to="/login"
        />
      </div>
    </div>
  </div>
</template>
