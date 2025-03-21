<template>
  <article
    class="flex flex-col gap-2 rounded-xl bg-gray-200 px-4 py-4 md:flex-row"
  >
    <div class="w-4/12 overflow-hidden rounded-lg">
      <slot name="img" />
    </div>
    <div class="flex w-8/12 flex-col gap-4 p-6">
      <header>
        <h1 class="text-xl">
          <slot name="header" />
        </h1>
      </header>
      <slot />
      <footer>
        <slot name="footer" />
      </footer>
    </div>
  </article>
</template>
<script setup lang="ts"></script>
