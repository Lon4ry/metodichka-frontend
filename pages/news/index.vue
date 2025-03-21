<script setup lang="ts">
import HorizontalPhotoCard from "~/components/horizontal-photo-card.vue";
import type { News } from "~/shared/types/news";
import { news_table } from "~/shared/db/dbImposter";

const newsRef: MaybeRef<News[]> = ref(news_table);
</script>

<template>
  <UContainer class="">
    <div class="space-y-4 py-4">
      <HorizontalPhotoCard v-for="newsRecord in newsRef">
        <template #img>
          <img :src="newsRecord.img" alt="" class="h-full w-full" />
        </template>
        <template #header>
          <h3 class="text-2xl font-bold md:text-3xl">{{ newsRecord.title }}</h3>
        </template>
        {{ newsRecord.description }}
        <template #footer>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-8">
              <p class="text-gray-500">
                Автор:
                <span class="text-blue-500">{{ newsRecord.author }}</span>
              </p>
              <p class="text-gray-500">
                Дата публикации:
                <span class="text-blue-500">{{ newsRecord.createdAt }}</span>
              </p>
            </div>

            <UButton
              :to="`/news/${newsRecord.id}`"
              variant="outline"
              color="neutral"
              class="text-xl"
            >
              Подробнее
            </UButton>
          </div>
        </template>
      </HorizontalPhotoCard>
    </div>
  </UContainer>
</template>
