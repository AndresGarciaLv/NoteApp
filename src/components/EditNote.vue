<!-- src/components/EditNote.vue -->
<template>
  <div class="bg-white shadow rounded p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Editar Nota</h2>
    <form @submit.prevent="updateNote">
      <div class="mb-4">
        <label for="editTitle" class="block text-gray-700 font-semibold mb-1">Título:</label>
        <input
          id="editTitle"
          type="text"
          v-model="note.title"
          required
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div class="mb-4">
        <label for="editContent" class="block text-gray-700 font-semibold mb-1">Contenido:</label>
        <textarea
          id="editContent"
          v-model="note.content"
          required
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        ></textarea>
      </div>
      <div class="mb-4">
        <span class="block text-gray-700 font-semibold mb-1">Etiquetas:</span>
        <div class="flex gap-4">
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              value="Personal"
              v-model="selectedTags"
              class="form-checkbox h-5 w-5 text-blue-600"
            />
            <span class="ml-2 text-gray-700">Personal</span>
          </label>
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              value="Trabajo"
              v-model="selectedTags"
              class="form-checkbox h-5 w-5 text-blue-600"
            />
            <span class="ml-2 text-gray-700">Trabajo</span>
          </label>
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              value="Urgente"
              v-model="selectedTags"
              class="form-checkbox h-5 w-5 text-blue-600"
            />
            <span class="ml-2 text-gray-700">Urgente</span>
          </label>
        </div>
      </div>
      <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded">
        Actualizar Nota
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNoteStore, type Note } from '../stores/noteStore'

const route = useRoute()
const router = useRouter()
const noteStore = useNoteStore()

// Se obtiene el id de la nota desde los parámetros de la ruta.
const noteId: string = route.params.id as string

// Referencia reactiva para la nota a editar.
const note = ref<Note>({
  id: '',
  title: '',
  content: '',
  tags: [],
  createdAt: 0
})

// Variable reactiva para almacenar las etiquetas seleccionadas mediante los checkboxes.
const selectedTags = ref<string[]>([])

onMounted((): void => {
  const foundNote: Note | undefined = noteStore.notes.find((n: Note) => n.id === noteId)
  if (foundNote) {
    // Se crea una copia para evitar modificar directamente el store.
    note.value = { ...foundNote }
    // Inicializa los checkboxes con las etiquetas existentes de la nota.
    selectedTags.value = [...foundNote.tags]
  } else {
    // Si la nota no se encuentra, se redirige al home.
    router.push('/')
  }
})

function updateNote(): void {
  // Actualiza las etiquetas de la nota con los valores seleccionados.
  note.value.tags = [...selectedTags.value]
  noteStore.updateNote(note.value)
  router.push('/')
}
</script>
