<template>
  <article class="flex w-4/12 gap-2 bg-gray-200 px-4 py-4">
    <div class="size-[400px] overflow-hidden rounded-lg">
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
