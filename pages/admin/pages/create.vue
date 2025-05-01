<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const config = useRuntimeConfig();

const schema = z.object({
  title: z.string().min(1, "Минимум 1 символов "),
  content: z.string().min(1, "Минимум 1 символ "),
  icon: z.string().optional(),
});

type Schema = z.output<typeof schema>;

const state = ref<Schema>({
  title: "",
  content: "",
  icon: "lucide:book",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const res = await $fetch(`${config.public.apiUrl}/pages`, {
    method: "POST",
    body: JSON.stringify(event.data),
  });
}

const tabs = [
  { name: "simple", label: "Настройки" },
  { name: "advanced", label: "Расширенные настройки" },
];

const activeTab = ref(tabs[1].name);
</script>

<template>
  <div class="flex flex-1 flex-col gap-10 p-10">
    <div class="flex gap-5">
      <UButton
        :key="tab.name"
        :variant="tab.name === activeTab ? 'solid' : 'outline'"
        @click="activeTab = tab.name"
        v-for="tab in tabs"
      >
        {{ tab.label }}
      </UButton>
    </div>
    <div v-if="'simple' === activeTab">
      <div></div>
    </div>
    <div v-if="'advanced' === activeTab" class="flex h-[500px] flex-1 gap-5">
      <div class="flex flex-1 flex-col">
        <label class="mb-2">Редактор</label>
        <Monaco v-model="state.content" />
      </div>
      <div class="flex h-[500px] flex-1 flex-col">
        <label class="mb-2">Превью</label>
        <MDC
          :value="state.content"
          class="max-w-[calc((100vw/2)-12px-40px)] flex-1 overflow-auto overscroll-none"
        />
      </div>
    </div>
  </div>
</template>

<style>
textarea {
  height: 100%;
  resize: none;
}
</style>
