<template>
  <article
    class="flex min-w-min flex-col items-center gap-6 rounded-xl border border-gray-200 px-4 py-4 md:flex-row md:items-stretch"
  >
    <div
      class="max-h-[300px] min-h-[300px] max-w-[350px] min-w-[350px] sm:max-w-[500px] sm:min-w-[500px]"
    >
      <div
        class="max-h-[300px] max-w-[350px] overflow-hidden rounded-lg sm:max-w-[500px]"
      >
        <slot name="img" />
      </div>
    </div>
    <div
      class="flex max-w-[350px] flex-col justify-between gap-4 sm:max-w-[none]"
    >
      <div class="space-y-3">
        <header>
          <h1 class="text-xl">
            <slot name="header" />
          </h1>
        </header>
        <slot />
      </div>
      <footer>
        <slot name="footer" />
      </footer>
    </div>
  </article>
</template>
<script setup lang="ts"></script>
