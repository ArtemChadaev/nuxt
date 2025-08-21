<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

const authStore = useAuthStore();

const schema = v.object({
  email: v.pipe(v.string(), v.trim(), v.email("Invalid email")),
  password: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(8, "Минимум 8 символов"),
    v.maxLength(32, "До 32"),
  ),
  passwordConfirm: v.pipe(
    v.string(),
    v.trim(),
    v.check((input) => {
      return input === state.password;
    }, "Пароли не совпадают"),
  ),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive({
  email: "",
  password: "",
  passwordConfirm: "",
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const response = await $fetch<{
      token: string;
      user: { name: string; id: number };
    }>("/api/auth/register", {
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
    await navigateTo(`/profile/${response.user.id}`);
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
        class="w-full"
      />
    </UFormField>
    <UFormField label="PasswordConfirm" name="passwordConfirm">
      <UInput
        v-model="state.passwordConfirm"
        placeholder="PasswordConfirm"
        type="password"
        class="w-full"
      />
    </UFormField>
    <UButton type="submit" label="register" class="mt-2 self-end" size="lg" />
  </UForm>
</template>

<style scoped></style>
