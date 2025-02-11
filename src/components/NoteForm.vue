<template>
  <form @submit.prevent="handleSubmit" class="bg-white shadow rounded p-6 mb-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Crear Nota</h2>
    <div class="mb-4">
      <label for="title" class="block text-gray-700 font-semibold mb-1">
        Título: <span class="text-red-500">*</span>
      </label>
      <input
        id="title"
        type="text"
        v-model="title"
        required
       class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
      />
    </div>

    <div class="mb-4">
      <label for="content" class="block text-gray-700 font-semibold mb-1">
        Contenido: <span class="text-red-500">*</span>
      </label>
      <textarea
        id="content"
        v-model="content"
        required
       class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
      ></textarea>
    </div>

    <div class="mb-4">
      <span class="block text-gray-700 font-semibold mb-1">
        Etiquetas: <span class="text-red-500">*</span>
      </span>
      <div class="flex flex-wrap gap-4 items-center">
        <div v-for="tag in tags" :key="tag">
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              :value="tag"
              v-model="selectedTags"
              class="form-checkbox h-5 w-5 text-blue-600"
            />
            <span class="ml-2 text-gray-700">{{ tag }}</span>
          </label>
        </div>
        <!-- Botón para abrir el modal de administración de etiquetas -->
        <button type="button" @click="openTagModal" class="ml-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded">
          Administrar Etiquetas
        </button>
      </div>
      <div v-if="errorMessage" class="ml-5 text-red-500 text-sm mt-1">
        {{ errorMessage }}
      </div>
    </div>
    <button type="submit" class="mt-5 w-full bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer text-white font-semibold py-2 rounded">
      Guardar Nota
    </button>
  </form>

  <!-- Modal para administrar etiquetas -->
  <TagManager v-if="isTagModalOpen" :isOpen="isTagModalOpen" @close="closeTagModal" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNoteForm } from '@/composables/useNoteForm'
import TagManager from './TagManager.vue'

const {
  title,
  content,
  selectedTags,
  errorMessage,
  tags,
  handleSubmit,
} = useNoteForm()

const isTagModalOpen = ref(false)

function openTagModal() {
  isTagModalOpen.value = true
}

function closeTagModal() {
  isTagModalOpen.value = false
}
</script>
