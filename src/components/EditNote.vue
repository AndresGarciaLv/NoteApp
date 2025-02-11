
<template>
  <div class="bg-white shadow rounded p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Editar Nota</h2>
    <form @submit.prevent="updateNote">
      <div class="mb-4">
        <label for="editTitle" class="block text-gray-700 font-semibold mb-1">Título:</label>
        <input
          id="editTitle"
          type="text"
          v-model="title"
          required
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div class="mb-4">
        <label for="editContent" class="block text-gray-700 font-semibold mb-1">Contenido:</label>
        <textarea
          id="editContent"
          v-model="content"
          required
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        ></textarea>
      </div>
      <div class="mb-4">
      <span class="block text-gray-700 font-semibold mb-1">
        Etiquetas: <span class="text-red-500">*</span>
      </span>
      <div class="flex gap-4">
        <label
          v-for="tag in tags"
          :key="tag"
          class="inline-flex items-center"
        >
          <input
            type="checkbox"
            :value="tag"
            v-model="selectedTags"
            class="form-checkbox h-5 w-5 text-blue-600"
          />
          <span class="ml-2 text-gray-700">{{ tag }}</span>
        </label>
      </div>
      <div v-if="errorMessage" class="ml-5 text-red-500 text-sm mt-1">
        {{ errorMessage }}
      </div>
    </div>
      <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded">
        Actualizar Nota
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useEditNote } from '@/composables/useEditNote'

const {
  title,
    content,
    selectedTags,
    errorMessage,
    tags,
    updateNote,
} = useEditNote()
</script>
