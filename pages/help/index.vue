<script setup lang="ts">
import type { TreeItem } from "#ui/components/Tree.vue";

const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();
const { data: pages } = await useFetch<Page[]>(`${config.public.apiUrl}/pages`);

function buildTree(
  pages: Page[],
  parentId: string | null = null,
): (Page & TreeItem)[] {
  return pages
    .filter((page) => page.parent === parentId)
    .map((page) => ({
      ...page,
      children: buildTree(pages, page.id),
    }));
}

const formatted = computed(() =>
  pages?.value?.map((v) => ({
    ...v,
    label: v.name,
    value: String(v.id),
    onSelect() {
      router.push({ query: { ...route.query, i: v.id } });
    },
    onToggle() {
      if (route.query.i === String(v.id)) {
        router.push({ query: { ...route.query, i: 1 } });
      }
    },
  })),
);

const selected = computed({
  get() {
    return formatted.value?.find((v) => v.value === route.query.i);
  },
  set(_) {},
});

const struct = buildTree(formatted.value ?? []);

// ГОВНОКОД
function findSelected(categories: (Page & TreeItem)[]): boolean {
  const s = categories.find((v) => v.id === selected.value?.id);
  if (s) {
    s.defaultExpanded = true;
    return true;
  } else {
    const d = categories.map((v) =>
      findSelected(v.children as (Page & TreeItem)[]),
    );
    if (d.includes(true)) {
      categories[d.indexOf(true)].defaultExpanded = true;
      return true;
    }
    return false;
  }
}
findSelected(struct);

const v = computed(() =>
  useFetch<Page>(`${config.public.apiUrl}/pages/${route.query.i ?? 0}`),
);
const markdown = computed(
  () => pages.value?.find((p) => p.id === route.query.i)?.content,
);
const lastMarkdown = ref(markdown.value);
watchEffect(() => {
  if (markdown.value) lastMarkdown.value = markdown.value;
});
</script>

<template>
  <main class="container mx-auto my-10 flex flex-col gap-2 px-5 md:flex-row">
    <div class="flex w-full flex-col md:w-1/4">
      <UInput />
      <UTree
        :items="struct"
        v-model="selected"
        selection-behavior="replace"
        :propagate-select="false"
        trailing-icon="i-lucide-square-chevron-down"
        expanded-icon="i-lucide-book-open"
        collapsed-icon="i-lucide-book"
      />
    </div>
    <MDC class="reset-tw w-full md:w-3/4" :value="lastMarkdown ?? ''" />
  </main>
</template>
