<!-- src/components/NoteForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="bg-white shadow rounded p-6 mb-6">
    <div class="mb-4">
      <label for="title" class="block text-gray-700 font-semibold mb-1">
        Título: <span class="text-red-500">*</span>
      </label>
      <input
        id="title"
        type="text"
        v-model="title"
        required
        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
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
      Guardar Nota
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNoteStore } from '../stores/noteStore'
import { useRouter } from 'vue-router'

const noteStore = useNoteStore()
const router = useRouter()

const title = ref<string>('')
const content = ref<string>('')
const errorMessage = ref<string>('')

// Arreglo con las etiquetas disponibles para evitar duplicar código en el template
const tags = ['Personal', 'Trabajo', 'Urgente', 'Escuela']
const selectedTags = ref<string[]>([])

function handleSubmit(): void {
  // Validación: se requiere seleccionar al menos una etiqueta
  if (selectedTags.value.length === 0) {
    errorMessage.value = 'Debes seleccionar al menos una etiqueta.'
    return
  }

  noteStore.addNote({
    title: title.value,
    content: content.value,
    tags: selectedTags.value
  })
  title.value = ''
  content.value = ''
  selectedTags.value = []
  errorMessage.value = ''
  router.push('/')
}
</script>
