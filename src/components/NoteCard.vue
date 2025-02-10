
<template>
  <div class="bg-white shadow rounded p-4 mb-4 border border-gray-200">
    <div class="mb-2 border-b border-gray-200 pb-2">
      <slot name="header"></slot>
    </div>
    <div class="mb-2">
      <slot name="content"></slot>
    </div>
    <div class="flex justify-end gap-2">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Este componente es puramente de presentación.
</script>
