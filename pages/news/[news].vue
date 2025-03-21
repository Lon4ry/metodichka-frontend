<script setup lang="ts">
import type { News } from "#shared/types/news";
import { news_table } from "#shared/db/dbImposter";

const route = useRoute();
const newsId: number = Number(route.params.news);
const currentNews: News = news_table.find((item) => item.id === newsId) || {
  id: 0,
  title: "Не найдено",
  description: "Да иди нахуй блять",
  author: "Еблан",
  createdAt: "Я не ебу",
  img: ".././apple.jpg",
};
</script>

<template>
  <UContainer>
    <h3 class="mb-4 text-3xl font-bold lg:text-6xl">{{ currentNews.title }}</h3>
    <p class="mb-3 text-xl">{{ currentNews.description }}</p>
    <div class="mb-9 flex space-x-8">
      <p class="text-gray-500">
        Автор: <span class="text-blue-500">{{ currentNews.author }}</span>
      </p>
      <p class="text-gray-500">
        Дата публикации:
        <span class="text-blue-500">{{ currentNews.createdAt }}</span>
      </p>
    </div>
    <img :src="currentNews.img" alt="" />
  </UContainer>
</template>
