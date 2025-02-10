// src/composables/useNoteList.ts
import { ref, computed } from 'vue'
import { useNoteStore } from '@/stores/noteStore'

export function useNoteList() {
  const noteStore = useNoteStore()

  // Estado para el filtrado, orden y búsqueda
  const selectedTag = ref<string>('')
  const sortOrder = ref<string>('desc') // Orden por defecto: Más reciente
  const searchQuery = ref<string>('')

  // Computado: filtra y ordena las notas de forma reactiva
  const sortedFilteredNotes = computed(() => {
    // Filtrado por etiqueta (si se ha seleccionado alguna)
    let filtered = selectedTag.value
      ? noteStore.notes.filter(note => note.tags.includes(selectedTag.value))
      : noteStore.notes

    // Filtrado por búsqueda: se busca en el título y el contenido (insensible a mayúsculas)
    if (searchQuery.value.trim() !== '') {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
      )
    }

    // Ordenar por fecha de creación
    return filtered.slice().sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortOrder.value === 'desc' ? dateB - dateA : dateA - dateB
    })
  })

  // Acciones
  function clearAll(): void {
    noteStore.clearAllNotes()
  }

  function clearByTag(): void {
    if (selectedTag.value) {
      noteStore.clearNotesByTag(selectedTag.value)
    }
  }

  function deleteNote(id: string): void {
    noteStore.deleteNote(id)
  }

  function getTagClasses(tag: string): string {
    switch (tag) {
      case 'Personal':
        return 'bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs'
      case 'Trabajo':
        return 'bg-purple-100 text-purple-800 rounded-full px-2 py-1 text-xs'
      case 'Urgente':
        return 'bg-orange-100 text-orange-800 rounded-full px-2 py-1 text-xs'
      default:
        return 'bg-gray-100 text-gray-800 rounded-full px-2 py-1 text-xs'
    }
  }

  return {
    noteStore,
    selectedTag,
    sortOrder,
    searchQuery,
    sortedFilteredNotes,
    clearAll,
    clearByTag,
    deleteNote,
    getTagClasses,
  }
}
