<template>
  <div v-if="isOpen" class="modal-overlay">

    <div class="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h3 class="text-2xl font-semibold mb-4 text-center">Administrar Etiquetas</h3>

      <!-- Lista de etiquetas o mensaje si no hay etiquetas -->
      <div v-if="tags.length > 0">
        <ul class="mb-4 divide-y divide-gray-300">
          <li
            v-for="tag in tags"
            :key="tag"
            class="py-2 flex justify-between items-center"
          >
            <span>{{ tag }}</span>
            <div>
              <button @click="editTag(tag)" class="text-yellow-500 hover:text-yellow-700 cursor-pointer hover:underline mr-2 transition-all ">
                Editar
              </button>
              <button @click="deleteTag(tag)" class="text-red-500 hover:text-red-700 cursor-pointer hover:underline transition-all ">
                Eliminar
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="mb-4 text-center text-gray-500">
        Sin etiquetas
      </div>

      <!-- Campo para agregar nueva etiqueta -->
      <div class="mb-4">
        <input
          type="text"
          v-model="newTag"
          placeholder="Nueva etiqueta"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
        />
      </div>

      <!-- Botones de acción -->
      <div class="flex justify-end space-x-2">
        <button @click="addNewTag" class="bg-green-500 hover:bg-green-600 cursor-pointer transition-all text-white font-semibold px-4 py-2 rounded">
          Agregar
        </button>
        <button @click="close" class="bg-gray-500 hover:bg-gray-600 cursor-pointer transition-all text-white font-semibold px-4 py-2 rounded">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTagStore } from '@/stores/tagStore'
import { useNoteStore } from '@/stores/noteStore'
import Swal from 'sweetalert2'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

// Usamos el store de etiquetas y de notas
const tagStore = useTagStore()
const noteStore = useNoteStore()

// Usamos storeToRefs para mantener la reactividad en "tags"
const { tags } = storeToRefs(tagStore)
const { addTag, updateTag, removeTag } = tagStore

// Variable local para la nueva etiqueta
const newTag = ref<string>('')

// Watch para monitorear cambios en 'tags' (por ejemplo, si se actualiza desde localStorage)
watch(
  tags,
  (newVal) => {
    if (newVal.length === 0) {
      console.log("Sin etiquetas")
    }
  },
  { immediate: true }
)

function addNewTag() {
  if (newTag.value.trim() !== '') {
    addTag(newTag.value.trim())
    Swal.fire('Agregada!', 'La etiqueta ha sido agregada exitosamente.', 'success')
    newTag.value = ''
  }
}

function deleteTag(tag: string) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará la etiqueta y la quitará de las notas.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      // Elimina la etiqueta del tagStore
      removeTag(tag)
      // Recorremos todas las notas y eliminamos la etiqueta, si existe.
      noteStore.notes.forEach(note => {
        if (note.tags.includes(tag)) {
          note.tags = note.tags.filter(t => t !== tag)
        }
      })
      Swal.fire('Eliminada!', 'La etiqueta ha sido eliminada.', 'success')
    }
  })
}

function editTag(tag: string) {
  Swal.fire({
    title: 'Editar etiqueta',
    input: 'text',
    inputLabel: 'Nueva etiqueta',
    inputValue: tag,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    inputValidator: (value) => {
      if (!value) {
        return 'Debes ingresar un valor!'
      }
    }
  }).then((result) => {
    if (result.isConfirmed && result.value.trim() !== '') {
      const newName = result.value.trim()
      updateTag(tag, newName)
      // Actualizamos todas las notas que contengan la etiqueta editada.
      noteStore.notes.forEach(note => {
        if (note.tags.includes(tag)) {
          note.tags = note.tags.map(t => (t === tag ? newName : t))
        }
      })
      Swal.fire('Actualizada!', 'La etiqueta ha sido actualizada.', 'success')
    }
  })
}

function close() {
  emit('close')
}
</script>

<style scoped>
/* Overlay del modal: fondo oscuro semi-transparente */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 50% de opacidad */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
</style>
