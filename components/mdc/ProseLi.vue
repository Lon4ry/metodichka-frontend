<script setup lang="ts"></script>

<template>
  <li><slot /></li>
</template>

<style>
.task-list-item {
  position: relative;
  padding-left: 20px;
}

.task-list-item input {
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  margin: 0;
}

.task-list-item input:checked::before {
  content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="white" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z"/></svg>');
  color: #ffffff;
  background-color: var(--ui-primary);
  border: none;
}
.task-list-item input::before {
  content: " ";
  display: inline-flex;
  position: absolute;
  width: 1em;
  height: 1em;
  left: 0;
  top: calc(50% - 0.5em);
  border-radius: 0.25em;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
}
</style>
