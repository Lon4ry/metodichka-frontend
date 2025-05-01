<script setup lang="ts">
import type { TreeItem } from "#ui/components/Tree.vue";

const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();
const { data: pages } = await useFetch<Page[]>(
  `${config.public.apiUrl}/pages`,
);

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
const markdown = computed(() => pages.value?.find(p => p.id === route.query.i)?.content);
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

<style lang="scss">
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
