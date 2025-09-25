<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { useUserStore } from "~/stores/user";
import { storeToRefs } from "pinia";
import { readonly } from "vue";

const userStore = useUserStore();
const {id, name} = readonly(storeToRefs(userStore));
const items = computed(() => {
  const dropdownItems: DropdownMenuItem = [
    {
      label: "Профиль",
      icon: "lucide-user-pen",
      to: `/profile/${id}`,
    },
    {
      label: "Подписка",
      icon: "lucide-user-star",
      to: `/profile/${id}/star`,
    },
    {
      label: "Настройки",
      icon: "lucide-user-cog",
      to: `/profile/${id}/settings`,
    },
    {
      label: "Выход",
      icon: "ic-baseline-exit-to-app",
      color: "error",
      onClick: () => {
        userStore.logout();
      },
    },
  ];
  return dropdownItems;
});
</script>

<template>
  <div
    class="flex justify-between items-center border rounded-2xl px-5 bg-emerald-50"
  >
    <div>
      <UButton
        label="Home"
        icon="lucide-home"
        color="info"
        variant="ghost"
        size="xl"
        to="/"
      />
    </div>
    <NuxtLink
      to="/game"
      class="text-center p-1 rounded-md text-info hover:bg-info-100"
      >Игры</NuxtLink
    >
    <div>
      <UDropdownMenu v-if="userStore.isLogged" :items="items" size="xl">
        <UButton
          :label="!!name ? name : 'Профиль'"
          trailing-icon="lucide-user"
          color="info"
          variant="ghost"
          size="xl"
        />
      </UDropdownMenu>
      <div v-else>
        <NuxtLink to="/login">
          Зайти
        </NuxtLink>


      </div>
    </div>
  </div>
</template>
