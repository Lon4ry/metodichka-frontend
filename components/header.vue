<script setup lang="ts">
const links = [
  { title: "Новости", to: "/" },
  { title: "Методичка", to: "/help" },
  { title: "О нас", to: "/about" },
  { title: "Вопрос - Ответ", to: "/for-students" },
  { title: "Педагогам", to: "/for-teachers" },
];
</script>

<template>
  <nav
    class="sticky top-0 flex flex-row justify-center gap-10 border-b border-b-blue-100 bg-white px-10 py-3"
  >
    <div class="flex items-center justify-center gap-3">
      <img src="/icon.png" alt="icon" class="size-10" />
      <span class="text-lg font-bold">metodichka</span>
    </div>
    <div class="flex flex-1 flex-row justify-center gap-2">
      <UButton
        :to="link.to"
        variant="link"
        v-for="link in links"
        class="text-lg text-black hover:text-blue-500"
        active-class="bg-blue-100"
      >
        {{ link.title }}
      </UButton>
    </div>
  </nav>
</template>
