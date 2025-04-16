<script setup lang="ts"></script>

<template>
  <Body class="font-museo light tracking-wider text-[#000]">
    <UApp>
      <Header />
      <slot />
      <Footer />
    </UApp>
  </Body>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
