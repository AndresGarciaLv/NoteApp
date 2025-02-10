// src/composables/useEditNote.ts
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNoteStore, type Note } from '@/stores/noteStore'
import { useNoteForm } from '@/composables/useNoteForm'

export function useEditNote() {
  const route = useRoute()
  const router = useRouter()
  const noteStore = useNoteStore()

  // Reutilizamos las propiedades y lógica común del formulario.
  const { title, content, selectedTags, errorMessage, tags } = useNoteForm()

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

  onMounted((): void => {
    const foundNote: Note | undefined = noteStore.notes.find((n: Note) => n.id === noteId)
    if (foundNote) {
      // Se crea una copia para evitar modificar directamente el store.
      note.value = { ...foundNote }
      // Inicializa los campos del formulario con los datos de la nota.
      title.value = foundNote.title
      content.value = foundNote.content
      selectedTags.value = [...foundNote.tags]
    } else {
      // Si la nota no se encuentra, se redirige al home.
      router.push('/')
    }
  })

  // Función que actualiza la nota en el store.
  function updateNote(): void {
    // Validamos que se hayan seleccionado etiquetas.
    if (selectedTags.value.length === 0) {
      errorMessage.value = 'Debes seleccionar al menos una etiqueta.'
      return
    }

    const updatedNote: Note = {
      ...note.value,
      title: title.value,
      content: content.value,
      tags: [...selectedTags.value],
    }

    noteStore.updateNote(updatedNote)
    router.push('/')
  }

  return {
    title,
    content,
    selectedTags,
    errorMessage,
    tags,
    updateNote,
  }
}
