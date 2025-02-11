// src/composables/useNoteForm.ts
import { ref } from 'vue'
import { useNoteStore } from '@/stores/noteStore'
import { useTagStore } from '@/stores/tagStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export function useNoteForm() {
  const noteStore = useNoteStore()
  const router = useRouter()
  const tagStore = useTagStore()

  // Extraemos de forma reactiva las etiquetas del tagStore usando storeToRefs
  const { tags } = storeToRefs(tagStore)

  // Estado del formulario
  const title = ref<string>('')
  const content = ref<string>('')
  const selectedTags = ref<string[]>([])
  const errorMessage = ref<string>('')

  function handleSubmit(): void {
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
    tags, // Este 'tags' es reactivo gracias a storeToRefs
    handleSubmit,
  }
}
