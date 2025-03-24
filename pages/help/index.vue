<script setup lang="ts">
const items = [{ label: "app", children: [{ label: "app", children: [] }] }];
const page = "# Hello";
</script>

<template>
  <main class="container mx-auto my-10 flex gap-2 px-5">
    <UTree :items="items" color="info" />
    <MDC class="reset-tw" :value="page" />
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
