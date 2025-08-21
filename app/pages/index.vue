<script setup lang="ts">
import BodySection from "~/pages/components/BodySection.vue";
</script>
<template>
  <div
    class="h-screen w-full grid grid-rows-[5%_95%] bg-neutral-50 justify-center"
  >
    <div
      class="grid 2xl:grid-cols-[1fr_1400px_1fr] xl:grid-cols-[1fr_1200px_1fr] lg:grid-cols-[1fr_900px_1fr] md:grid-cols-[1fr_600px_1fr] pt-2"
    >
      <div />
      <AppHeader />
      <div />
    </div>
    <div
      class="grid 2xl:grid-cols-[1fr_1200px_1fr] xl:grid-cols-[1fr_1000px_1fr] lg:grid-cols-[1fr_800px_1fr] md:grid-cols-[1fr_500px_1fr]"
    >
      <div />
      <BodySection />
      <div />
    </div>
  </div>
</template>
