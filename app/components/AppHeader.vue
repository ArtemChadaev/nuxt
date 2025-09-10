<script setup lang="ts">
import type { DropdownMenuItem, TabsItem } from "@nuxt/ui";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";
import { readonly } from "vue";
import LoginForm from "~/components/AppHeader/LoginForm.vue";
import RegisterForm from "~/components/AppHeader/RegisterForm.vue";

const authStore = useAuthStore();
const user = readonly(storeToRefs(authStore));
const items = computed(() => {
  const dropdownItems: DropdownMenuItem = [
    {
      label: "Профиль",
      icon: "lucide-user-pen",
      to: `/profile/${user.id}`,
    },
    {
      label: "Подписка",
      icon: "lucide-user-star",
      to: `/profile/${user.id}/star`,
    },
    {
      label: "Настройки",
      icon: "lucide-user-cog",
      to: `/profile/${user.id}/settings`,
    },
    {
      label: "Выход",
      icon: "ic-baseline-exit-to-app",
      color: "error",
      onClick: () => {
        authStore.logout();
      },
    },
  ];
  return dropdownItems;
});

const itemsTabs = ref<TabsItem[]>([
  {
    label: "login",
    slot: "login" as const,
  },
  {
    label: "register",
    slot: "register" as const,
  },
]);
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
      <UDropdownMenu v-if="authStore.isLogged" :items="items" size="xl">
        <UButton
          :label="!!user.user ? user.user : 'Профиль'"
          trailing-icon="lucide-user"
          color="info"
          variant="ghost"
          size="xl"
        />
      </UDropdownMenu>
      <UModal v-else>
        <UButton
          label="Войти"
          trailing-icon="lucide-user-round-check"
          color="info"
          variant="ghost"
          size="xl"
        />
        <template #content>
          <div class="p-4">
            <UTabs :items="itemsTabs" class="w-full">
              <!--suppress VueUnrecognizedSlot -->
              <template #login>
                <LoginForm />
              </template>
              <!--suppress VueUnrecognizedSlot -->
              <template #register>
                <RegisterForm />
              </template>
            </UTabs>
          </div>
        </template>
      </UModal>
    </div>
  </div>
</template>
