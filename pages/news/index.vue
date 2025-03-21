<script setup lang="ts">
type News = {
  id: number;
  img: string;
  name: string;
  description: string;
  author: string;
  createdAt: string;
};
const news: News[] = ref([
  {
    id: 1,
    img: "http://metodichka-prog.ru/wp-content/uploads/2025/03/swqwdswd.png",
    title: "Курсовые защиты — Успех!",
    description:
      " Поздравляем группы СИП 423, СИП 433 и СИП 443 с успешной защитой",
    author: "Павлов А.В",
    createdAt: "21.03.2025",
  },
  {
    id: 2,
    img: "http://metodichka-prog.ru/wp-content/uploads/2025/02/L_height.webp",
    title: "Для групп СИП 423, СИП 433, СИП 443",
    description:
      " Сдача 1 главы курсовой работы на проверку 21 февраля. Форматирование и разделы в соответствии с требованиями",
    author: "Павлов А.В",
    createdAt: "21.03.2025",
  },
]);
</script>

<template>
  <UContainer>
    <HorizontalPhotoCard v-for="newsRecord in news">
      <template #img>
        <img :src="newsRecord.img" alt="" class="h-full w-full" />
      </template>
      <template #header>
        {{ newsRecord.title }}
      </template>
      {{ newsRecord.description }}
    </HorizontalPhotoCard>
  </UContainer>
</template>
