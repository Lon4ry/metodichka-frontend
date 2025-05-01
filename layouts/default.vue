<script setup lang="ts"></script>

<template>
  <Body class="font-museo light tracking-wider text-[#000]">
    <UApp>
      <div class="flex min-h-screen flex-col">
        <Header />
        <main class="flex flex-1"><slot /></main>
        <Footer />
      </div>
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
