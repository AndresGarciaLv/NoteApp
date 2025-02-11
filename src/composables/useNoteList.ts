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
        return 'bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs';
      case 'Trabajo':
        return 'bg-purple-100 text-purple-800 rounded-full px-2 py-1 text-xs';
      case 'Urgente':
        return 'bg-orange-100 text-orange-800 rounded-full px-2 py-1 text-xs';
      default: {
        // Lista de estilos amigables predefinidos para etiquetas nuevas
        const friendlyStyles = [
          'bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs',
          'bg-pink-100 text-pink-800 rounded-full px-2 py-1 text-xs',
          'bg-yellow-100 text-yellow-800 rounded-full px-2 py-1 text-xs',
          'bg-indigo-100 text-indigo-800 rounded-full px-2 py-1 text-xs',
          'bg-gray-100 text-gray-800 rounded-full px-2 py-1 text-xs',
          'bg-red-100 text-red-800 rounded-full px-2 py-1 text-xs',
          'bg-blue-200 text-blue-900 rounded-full px-2 py-1 text-xs',
        ];

        // Usamos una función hash simple para generar un índice a partir del nombre de la etiqueta.
        let hash = 0;
        for (let i = 0; i < tag.length; i++) {
          hash = tag.charCodeAt(i) + ((hash << 5) - hash);
        }
        // Nos aseguramos de que el índice sea positivo y dentro del rango del array
        const index = Math.abs(hash) % friendlyStyles.length;
        return friendlyStyles[index];
      }
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
