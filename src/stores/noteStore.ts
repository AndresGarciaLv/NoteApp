// src/store/noteStore.ts
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import Swal from 'sweetalert2'  // Importamos SweetAlert2

export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: number
}

export const useNoteStore = defineStore('notes', () => {
  // Estado: lista de notas
  const notes = ref<Note[]>([])

  // Computed: total de notas
  const totalNotes = computed(() => notes.value.length)

  // Computed: total de notas por etiqueta
  const notesByTag = computed<Record<string, number>>(() => {
    const tagCount: Record<string, number> = {}
    notes.value.forEach((note: Note) => {
      note.tags.forEach((tag: string) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      })
    })
    return tagCount
  })

  // Acción: Agregar una nota
  function addNote(note: Omit<Note, 'id' | 'createdAt'>): void {
    const newNote: Note = {
      id: Date.now().toString(),
      title: note.title,
      content: note.content,
      tags: note.tags,
      createdAt: Date.now()
    }
    notes.value.push(newNote)
    Swal.fire('Creada!', 'La nota ha sido creada con éxito.', 'success')
  }

  // Acción: Actualizar una nota existente
  function updateNote(updatedNote: Note): void {
    const index = notes.value.findIndex((n: Note) => n.id === updatedNote.id)
    if (index !== -1) {
      notes.value[index] = updatedNote
      Swal.fire('Actualizada!', 'La nota ha sido actualizada con éxito.', 'success')
    }
  }

  // Acción: Eliminar una nota con confirmación
  async function deleteNote(id: string): Promise<void> {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    })

    if (result.isConfirmed) {
      notes.value = notes.value.filter((note: Note) => note.id !== id)
      Swal.fire('Eliminada!', 'La nota ha sido eliminada con éxito.', 'success')
    }
  }

  // Acción: Limpiar todas las notas con confirmación
  async function clearAllNotes(): Promise<void> {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará todas las notas. ¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar todas!'
    })

    if (result.isConfirmed) {
      notes.value = []
      Swal.fire('Eliminadas!', 'Todas las notas han sido eliminadas.', 'success')
    }
  }

  // Acción: Limpiar notas que contengan una etiqueta específica con confirmación
  async function clearNotesByTag(tag: string): Promise<void> {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Esta acción eliminará todas las notas que contengan la etiqueta "${tag}". ¡No podrás revertir esto!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    })

    if (result.isConfirmed) {
      notes.value = notes.value.filter((note: Note) => !note.tags.includes(tag))
      Swal.fire('Eliminadas!', `Las notas con la etiqueta "${tag}" han sido eliminadas.`, 'success')
    }
  }

  // Cargar notas desde LocalStorage, si existen
  const savedNotes = localStorage.getItem('notes')
  if (savedNotes) {
    try {
      notes.value = JSON.parse(savedNotes)
    } catch (error) {
      console.error('Error al parsear las notas del localStorage', error)
    }
  }

  // Sincronizar el estado con LocalStorage
  watch(
    notes,
    (newNotes) => {
      localStorage.setItem('notes', JSON.stringify(newNotes))
    },
    { deep: true }
  )

  return {
    notes,
    totalNotes,
    notesByTag,
    addNote,
    updateNote,
    deleteNote,
    clearAllNotes,
    clearNotesByTag,
  }
})
