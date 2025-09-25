<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";

const schema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(8, "Минимум 8 символов").max(32, "Максимум 32 символа"),
  passwordConfirm: z.string()
}).refine(data => data.password === data.passwordConfirm, {
  message: "пароли не совпадают",
  path: ["passwordConfirm"],
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: "",
  password: "",
  passwordConfirm: "",
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    console.log(event.data)
    const response = await $fetch<{
      token: string;
      user: { name: string; id: number }
    }>("localhost:8080/auth/sign-up", {
      method: "POST",
      body: event.data,
    })

    toast.add({
      title: "Успех",
      description: "Вы успешно вошли в систему",
      color: "success",
    });
    await navigateTo(`/profile/${response.user.id}`)
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
