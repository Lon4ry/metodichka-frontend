
<template>
  <footer class="bg-[#f8f9fc]">
    <div class="container mx-auto">
      <div class="m-5 flex justify-between gap-4 border-b-gray-300 py-5">
        <div class="space-y-4">
          <NuxtLink class="flex items-center gap-3" to="/">
            <img src="/icon.png" class="size-16" alt="" />
            <span class="text-3xl font-bold">metodichka</span>
          </NuxtLink>
        </div>
        <nav
          class="hidden flex-row justify-between gap-10 border-b border-b-blue-100 bg-white px-4 py-3 md:flex md:justify-center lg:px-10"
        >
          <UButton
            :to="link.to"
            variant="link"
            v-for="link in links"
            class="text-lg text-black hover:text-blue-500"
            active-class="bg-blue-100"
          >
            {{ link.title }}
          </UButton>
        </nav>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
 const links = [
  { title: "Новости", to: "/" },
  { title: "Методичка", to: "/help" },
  { title: "О нас", to: "/about" },
  { title: "Вопрос - Ответ", to: "/for-students" },
  { title: "Педагогам", to: "/for-teachers" },
];
</script>