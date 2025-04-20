<script setup lang="ts">
import { computed } from "vue";

const config = useRuntimeConfig()
console.log(config)
const { data: news } = await useFetch<News[]>(
    `${config.public.apiUrl}/news`,
  )

console.log(news)
</script>

<template>
  <UContainer>
    <div class="space-y-4 py-4">
      <h2
        class="my-8 text-center text-xl font-extrabold min-[320px]:text-2xl min-[450px]:text-4xl md:text-5xl lg:text-left lg:text-6xl"
      >
        Новости / Объявления
      </h2>
      <HorizontalPhotoCard v-for="n in news">
        <template #img>
          <img :src="n.img" alt="" class="size-full" />
        </template>
        <template #header>
          <h3 class="text-2xl font-bold md:text-3xl">{{ n.title }}</h3>
        </template>
        <MDC class="reset-tw line-clamp-5 w-full md:w-3/4" :value="n.markdown ?? ''" />
        <template #footer>
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center space-x-8">
              <p class="text-gray-500">
                Автор:
                <span class="text-blue-500">{{ n.author }}</span>
              </p>
              <p class="text-gray-500">
                Дата публикации:
                <span class="text-blue-500">{{ n.createdAt }}</span>
              </p>
            </div>
            <UButton
              :to="`/news/${n.id}`"
              variant="outline"
              color="neutral"
              size="lg"
            >
              Подробнее
            </UButton>
          </div>
        </template>
      </HorizontalPhotoCard>
    </div>
  </UContainer>
</template>
