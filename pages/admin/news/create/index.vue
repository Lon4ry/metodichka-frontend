<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const config = useRuntimeConfig();
const items = ref([
  {
    type: "label",
    label: "Заголовки",
  },

  {
    label: "Заголовок 1 уровня ",
    value: "heading1",
  },
  {
    label: "Заголовок 2 уровня ",
    value: "heading2",
  },
  {
    label: "Заголовок 3 уровня ",
    value: "heading3",
  },
  {
    label: "Заголовок 4 уровня ",
    value: "heading4",
  },
  {
    label: "Заголовок 5 уровня ",
    value: "heading5",
  },
  {
    type: "label",
    label: "Текст",
  },
  {
    label: "Параграф",
    value: "paragraph",
  },
  {
    type: "label",
    label: "Блоки",
  },
  {
    label: "Цитата",
    value: "quote",
  },
]);
const schema = z.object({
  title: z.string().min(8, "Минимум 8 символов "),
  author: z.string().min(8, "Минимум 8 символов"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  title: undefined,
  author: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
  const res = await $fetch(`${config.public.apiUrl}/news`, {
    method: "POST",
    body: {
      Author: state.author,
      Title: state.title,
      Markdown: markDown.value,
      Img: "https://metodichka-prog.ru/wp-content/uploads/2025/03/swqwdswd.png",
    },
  });
}
const markDown = ref("");
const isItalic = ref(false);
const isBold = ref(false);
const isQuote = ref(false);
const currentType = ref("paragraph");
const currentElement = ref("");
function setMarkDown() {
  currentElement.value = currentElement.value.trim();
  console.log(currentElement.value);
  let newMarkDown;
  switch (currentType.value) {
    case "heading1":
      newMarkDown = `# ${currentElement.value}`;
      break;
    case "heading2":
      newMarkDown = `## ${currentElement.value}`;
      break;
    case "heading3":
      newMarkDown = `### ${currentElement.value}`;
      break;
    case "heading4":
      newMarkDown = `#### ${currentElement.value}`;
      break;
    case "heading5":
      newMarkDown = `##### ${currentElement.value}`;
      break;
    default:
      newMarkDown = `${currentElement.value}`;
  }
  if (isBold.value) {
    newMarkDown = `**${newMarkDown}**`;
  }
  if (isItalic.value) {
    newMarkDown = `*${newMarkDown}*`;
  }
  if (isItalic.value && isBold.value) {
    newMarkDown = `***${newMarkDown}***`;
  }
  if (isQuote.value) {
    newMarkDown = newMarkDown
      .split("\n")
      .map((line) => `>${line.trim()} \n`)
      .join(">");
  }
  isItalic.value = false;
  isBold.value = false;
  isQuote.value = false;
  currentElement.value = "";
  markDown.value += `\n\n${newMarkDown}`;
  console.log(markDown.value);
}
</script>
<template>
  <UContainer class="my-5">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-2xl">Добавление новой новости</h2>
          <h3>Название {{ state.title }}</h3>
        </div>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="w-full space-y-4"
        @submit="onSubmit"
      >
        <template #default>
          <div class="space-y-5">
            <div class="flex items-center space-x-8">
              <UFormField label="Название новости" class="w-60" name="title">
                <UInput class="w-full" v-model="state.title" />
              </UFormField>

              <UFormField label="Автор" class="w-60" name="author">
                <UInput v-model="state.author" class="w-full" type="text" />
              </UFormField>
            </div>
            <div class="flex items-center gap-4">
              <span>Добавить новый блок</span>
              <USelect class="w-64" v-model="currentType" :items="items" />
              <UButton @click="setMarkDown">Добавить блок</UButton>
              <UButton
                @click="
                  markDown += `\n ${currentElement}`;
                  currentElement = '';
                "
                >Добавить как markdown/html синтаксис</UButton
              >
            </div>
            <div class="flex items-center gap-4">
              <UCheckbox v-model="isItalic" label="Курсив" />
              <UCheckbox v-model="isBold" label="Жирный" />
              <UCheckbox v-model="isQuote" label="Цитата" />
            </div>
            <UTextarea class="w-full" v-model="currentElement"> </UTextarea>
          </div>
          <MDC class="reset-tw w-full md:w-3/4" :value="markDown ?? ''" />
          <UButton type="submit"> Добавить запись </UButton>
        </template>
      </UForm>
    </UCard>
  </UContainer>
</template>
<style lang="scss" scoped>
.reset-tw {
  h1 {
    font-size: var(--text-xl);
    line-height: var(--tw-leading, var(--text-xl--line-height));
    font-weight: var(--font-weight-black);
  }
  h2 {
    font-size: var(--text-lg);
    line-height: var(--tw-leading, var(--text-lg--line-height));
    font-weight: var(--font-weight-extrabold);
  }
  h3 {
    font-size: var(--text-base);
    line-height: var(--tw-leading, var(--text-base--line-height));
    font-weight: var(--font-weight-extrabold);
  }
  h4 {
    font-size: var(--text-base);
    line-height: var(--tw-leading, var(--text-base--line-height));
    font-weight: var(--font-weight-bold);
  }
  h5 {
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
    font-weight: var(--font-weight-bold);
  }
  h6 {
    font-size: var(--text-xs);
    line-height: var(--tw-leading, var(--text-xs--line-height));
    font-weight: var(--font-weight-bold);
  }
  blockquote {
    background: var(--color-blue-50);
  }
  th,
  td {
    padding: calc(var(--spacing) * 2);
    border: 1px solid var(--color-blue-200);
  }
  ol {
    list-style-type: decimal;
  }
  ul {
    list-style-type: disc;
  }
  ul,
  ol {
    margin-left: calc(var(--spacing) * 6);
  }
  p {
    margin: calc(var(--spacing) * 4) 0;
  }
  a {
    text-decoration: underline;
  }
}
</style>
