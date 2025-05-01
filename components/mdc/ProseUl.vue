<script setup lang="ts"></script>

<template>
  <ul>
    <slot />
  </ul>
</template>

<style scoped>
ul {
  @apply list-inside list-disc;
}

.contains-task-list {
  @apply list-none;
}
</style>
