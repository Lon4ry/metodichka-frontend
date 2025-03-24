<script setup lang="ts">
import type { TreeItem } from "#ui/components/Tree.vue";

const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();

const { data } = await useFetch<Category[]>(
  `${config.public.apiUrl}/categories`,
);

function buildTree(
  categories: Category[],
  parentId: number | null = null,
): (Category & TreeItem)[] {
  return categories
    .filter((category) => category.parentCategoryID === parentId)
    .map((category) => ({
      ...category,
      children: buildTree(categories, category.id),
    }));
}

const formatted = computed(() =>
  data?.value?.map((v) => ({
    ...v,
    label: v.name,
    value: String(v.id),
    onSelect() {
      router.push({ query: { ...route.query, i: v.id } });
    },
  })),
);

const selected = computed(() =>
  formatted.value?.find((v) => v.value === route.query.i),
);

const struct = buildTree(formatted.value ?? []);

// ГОВНОКОД
function findSelected(categories: (Category & TreeItem)[]): boolean {
  const s = categories.find((v) => v.id === selected.value?.id);
  if (s) {
    s.defaultExpanded = true;
    return true;
  } else {
    const d = categories.map((v) =>
      findSelected(v.children as (Category & TreeItem)[]),
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
  useFetch<Page>(`${config.public.apiUrl}/pages/${route.query.i}`),
);
const markdown = computed(() => v.value.data.value?.markdown);
const lastMarkdown = ref(markdown.value);
watchEffect(() => {
  if (markdown.value) lastMarkdown.value = markdown.value;
});
</script>

<template>
  <main class="container mx-auto my-10 flex flex-col gap-2 px-5 md:flex-row">
    <UTree
      class="w-full md:w-1/4"
      :items="struct"
      :default-value="selected"
      selection-behavior="replace"
      :propagate-select="false"
      trailing-icon="i-lucide-chevron-down"
      expanded-icon="i-lucide-book-open"
      collapsed-icon="i-lucide-book"
    />
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
}
</style>
