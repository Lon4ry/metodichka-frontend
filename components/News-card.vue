<script>
export default {
  name: "NewsCard",
  props: ["id", "description", "img", "title", "author"],
};
</script>

<!-- <template>
  <div class="flex justify-around px-8 py-4">
    <slot name="img" />
    <div class="space-y-4 p-6">
      <slot name="title" />
      <slot name="description" />
      <slot name="author" />
    </div>
  </div>
</template> -->

<template>
  <div
    class="mx-auto mb-4 flex w-9/12 justify-between rounded-xl bg-gray-200 px-4 py-4"
  >
    <img :src="img" height="400" class="w-4/12 rounded-xl" />
    <div class="w-8/12 space-y-4 p-6">
      <h4 class="text-xl">{{ title }}</h4>
      <p class="text-lg">{{ description }}</p>
      <div class="flex justify-between">
        <p class="text-md text-gray-400">{{ author }}</p>
        <p class="text-md text-gray-400"></p>
        <UButton color="neutral" :to="`/news/${id}`">Подробнее</UButton>
      </div>
    </div>
  </div>
</template>
