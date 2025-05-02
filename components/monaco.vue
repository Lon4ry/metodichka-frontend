<script setup lang="ts">
import { createHighlighter } from "shiki";
import { shikiToMonaco } from "@shikijs/monaco";

const editor = useTemplateRef("editor");

const model = defineModel<string>();

type MonacoEditor = {
  onDidChangeModelContent: (e: unknown) => void;
  getValue: () => string;
  dispose: () => void;
  layout: () => void;
};

const isLoading = ref(true);

const monaco = ref<typeof import("monaco-editor-core") | null>(null);
let monacoEditor: MonacoEditor;
onMounted(async () => {
  if (!monaco.value) {
    monaco.value = await import("monaco-editor-core");
  }

  const highlighter = await createHighlighter({
    themes: ["everforest-dark"],
    langs: ["markdown"],
  });

  monaco.value?.languages.register({ id: "markdown" });
  shikiToMonaco(highlighter, monaco.value);

  isLoading.value = false;

  window.onresize = () => {
    if (monacoEditor) monacoEditor.layout();
  };
});

watch(editor, (el) => {
  if (el && !monacoEditor)
    monacoEditor = monaco.value?.editor.create(el, {
      language: "markdown",
      theme: "everforest-dark",
      value: model.value,
    }) as MonacoEditor;
  if (monacoEditor)
    monacoEditor.onDidChangeModelContent(() => {
      model.value = monacoEditor.getValue();
    });
});

watchEffect(() => console.log(isLoading.value));

onUnmounted(() => {
  if (monacoEditor) monacoEditor.dispose();
});
</script>

<template>
  <ClientOnly>
    <div
      v-if="isLoading"
      class="flex h-full items-center justify-center rounded bg-gray-100"
    >
      <UIcon name="lucide:loader" class="mr-2" />
      Загрузка редактора...
    </div>
    <div v-else ref="editor" class="size-full flex-1 overflow-hidden rounded" />
  </ClientOnly>
</template>

<style scoped></style>
