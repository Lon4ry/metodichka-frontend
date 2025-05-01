<script setup lang="ts"></script>

<template>
  <ol>
    <slot />
  </ol>
</template>

<style scoped>
ol {
  @apply list-inside list-decimal;
}
</style>
