<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(8, "Минимум 8 символов").max(32, "Максимум 32 символа"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
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
