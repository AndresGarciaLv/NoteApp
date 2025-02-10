
import { ref } from 'vue'
import { useNoteStore } from '@/stores/noteStore'
import { useRouter } from 'vue-router'

export function useNoteForm() {
  const noteStore = useNoteStore()
  const router = useRouter()

  // Estado del formulario
  const title = ref<string>('')
  const content = ref<string>('')
  const selectedTags = ref<string[]>([])
  const errorMessage = ref<string>('')

  // Arreglo de etiquetas disponibles
  const tags = ['Personal', 'Trabajo', 'Urgente']

  // Función que maneja el envío del formulario
  function handleSubmit(): void {
    // Validación: se requiere seleccionar al menos una etiqueta
    if (selectedTags.value.length === 0) {
      errorMessage.value = 'Debes seleccionar al menos una etiqueta.'
      return
    }

    noteStore.addNote({
      title: title.value,
      content: content.value,
      tags: selectedTags.value,
    })

    // Limpiar el formulario
    title.value = ''
    content.value = ''
    selectedTags.value = []
    errorMessage.value = ''

    router.push('/')
  }

  return {
    title,
    content,
    selectedTags,
    errorMessage,
    tags,
    handleSubmit,
  }
}
