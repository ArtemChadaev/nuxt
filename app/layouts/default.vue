<template>
  <UApp>
    <div
      class="h-screen w-full grid grid-rows-[5%_95%] bg-neutral-50 justify-center"
    >
      <div
        class="grid 2xl:grid-cols-[1fr_1400px_1fr] xl:grid-cols-[1fr_1200px_1fr] lg:grid-cols-[1fr_900px_1fr] md:grid-cols-[1fr_700px_1fr] sm:grid-cols-[1fr_550px_1fr] grid-cols-[1fr_400px_1fr] pt-2"
      >
        <div />
        <AppHeader />
        <div />
      </div>
      <div
        class="grid 2xl:grid-cols-[1fr_1200px_1fr] xl:grid-cols-[1fr_1000px_1fr] lg:grid-cols-[1fr_800px_1fr] md:grid-cols-[1fr_600px_1fr] sm:grid-cols-[1fr_450px_1fr] grid-cols-[1fr_350px_1fr]"
      >
        <div />
        <div class="w-full">
          <div class="bg-white p-4 mt-8 rounded-2xl">
            <slot />
          </div>
        </div>
        <div />
      </div>
    </div>
  </UApp>
</template>
<script setup lang="ts">
// TODO: Сделать чёрную тему

const tokenStore = useTokenStore()
onMounted(() => {

})
</script>
