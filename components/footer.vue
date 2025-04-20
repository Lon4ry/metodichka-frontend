
<template>
  <footer class="bg-[#f8f9fc]">
    <div class="container mx-auto">
      <div class="m-5 flex justify-between gap-4 border-b border-b-gray-200 py-5">
        <div class="space-y-4">
          <NuxtLink class="flex items-center gap-3" to="/">
            <img src="/icon.png" class="size-16" alt="" />
            <span class="text-3xl font-bold">metodichka</span>
          </NuxtLink>
          <div class="flex space-x-4 items-center">
            <UButton
            :to="link.to"
            variant="link"
            v-for="link in socialMediaLinks"
            class="p-2 rounded-lg bg-blue-100"
            >
              <UIcon :name="link.iconName" size="24" class="bg-black" />
            </UButton>
          </div>
        </div>
        <nav
          class="hidden flex-row justify-between gap-x-10   md:flex md:justify-center "
        >
          <UButton
            :to="link.to"
            variant="link"
            v-for="link in links"
            class="text-md text-black hover:text-blue-500"

          >
            {{ link.title }}
          </UButton>
        </nav>
      </div>
      <div class="m-5 flex justify-between gap-4  py-5">
        <span class="text-gray-400 text-sm">© Авторское право Яблочко ебанное. Все права защищены.</span>
        <nav
          class="hidden flex-row justify-between gap-x-10   md:flex md:justify-center "
        >
          <UButton
            :to="link.to"
            variant="link"
            v-for="link in links"
            class="text-md text-black hover:text-blue-500"

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
 const socialMediaLinks = [
   {iconName: "cib:telegram-plane", to: 'https://t.me/programistkst'},
   {iconName: "bxl:vk", to: 'https://vk.ru/'},
 ]
</script>