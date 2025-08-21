<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

const toast = useToast();
const authStore = useAuthStore();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const response = await $fetch<{
      token: string;
      user: { name: string; id: number };
    }>("/api/auth/login", {
      method: "POST",
      body: event.data,
    });

    // Сохраняем токен и информацию о пользователе в хранилище
    authStore.login(response.token, response.user.name, response.user.id);

    toast.add({
      title: "Успех",
      description: "Вы успешно вошли в систему",
      color: "success",
    });
  } catch (error: any) {
    toast.add({
      title: "Ошибка",
      description: error.data?.message || "Ошибка авторизации",
      color: "error",
    });
  }
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-2 w-full flex flex-col gap-2"
    @submit="onSubmit"
  >
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" placeholder="Email" class="w-full" />
    </UFormField>
    <UFormField label="Password" name="password">
      <UInput
        v-model="state.password"
        placeholder="Password"
        type="password"
        class="w-full mb-[72px]"
      />
    </UFormField>
    <UButton label="login" type="submit" class="mt-2 self-end" size="lg" />
  </UForm>
</template>

<style scoped></style>
