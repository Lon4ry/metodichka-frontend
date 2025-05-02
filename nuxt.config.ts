// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxtjs/mdc",
    "@nuxt/icon",
  ],
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  mdc: {
    highlight: {
      theme: "catppuccin-latte",
      langs: [
        "css",
        "html",
        "javascript",
        "typescript",
        "json",
        "1c",
        "1c-query",
        "c#",
        "csharp",
        "python",
        "bash",
        "vue",
      ],
    },
  },
  fonts: {
    defaults: {
      weights: [300, 700, 900],
      styles: ["normal"],
      subsets: ["cyrillic", "latin"],
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  runtimeConfig: {
    public: { apiUrl: "http://localhost:8080/api" },
  },
});
