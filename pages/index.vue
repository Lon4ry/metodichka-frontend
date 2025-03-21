<script setup lang="ts">
const news = mockNews;
</script>

<template>
  <UContainer>
    <div class="space-y-4 py-4">
      <HorizontalPhotoCard v-for="n in news">
        <template #img>
          <img :src="n.img" alt="" class="size-full" />
        </template>
        <template #header>
          <h3 class="text-2xl font-bold md:text-3xl">{{ n.title }}</h3>
        </template>
        <p class="line-clamp-5">{{ n.description }}</p>
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
