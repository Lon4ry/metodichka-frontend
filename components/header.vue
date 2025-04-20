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
    class="sticky top-0 flex flex-row justify-between gap-10 border-b border-b-blue-100 bg-white px-4 py-3 md:justify-center lg:px-10"
  >
    <NuxtLink to="/" class="flex items-center justify-center gap-3">
      <img src="/icon.png" alt="icon" class="size-11" />
      <span class="text-2xl font-bold">metodichka</span>
    </NuxtLink>
    <div class="hidden flex-1 flex-row justify-center gap-1 md:flex">
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
    <UDrawer direction="right">
      <UButton variant="ghost" color="neutral" class="md:hidden">
        <UIcon name="i-lucide-align-justify" class="size-5" />
      </UButton>
      <template #body>
        <div class="flex flex-col gap-2">
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
      </template>
    </UDrawer>
  </nav>
</template>
