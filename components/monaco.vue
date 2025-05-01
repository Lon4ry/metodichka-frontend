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

const monaco = ref<typeof import("monaco-editor-core") | null>(null);
let monacoEditor: MonacoEditor;
onMounted(async () => {
  if (!monaco.value) {
    monaco.value = await import("monaco-editor-core");
  }

  const highlighter = await createHighlighter({
    themes: ["catppuccin-latte"],
    langs: ["markdown"],
  });

  monaco.value?.languages.register({ id: "markdown" });
  shikiToMonaco(highlighter, monaco.value);

  if (editor.value)
    monacoEditor = monaco.value?.editor.create(editor.value, {
      language: "markdown",
      theme: "catppuccin-latte",
      value: model.value,
    }) as MonacoEditor;
  monacoEditor.onDidChangeModelContent(() => {
    model.value = monacoEditor.getValue();
  });

  window.onresize = () => {
    if (monacoEditor) monacoEditor.layout();
  };
});

onUnmounted(() => {
  if (monacoEditor) monacoEditor.dispose();
});
</script>

<template>
  <div ref="editor" class="size-full flex-1 overflow-hidden rounded" />
</template>

<style scoped></style>
