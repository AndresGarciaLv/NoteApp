// src/store/noteStore.ts
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

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
  }

  // Acción: Actualizar una nota existente
  function updateNote(updatedNote: Note): void {
    const index = notes.value.findIndex((n: Note) => n.id === updatedNote.id)
    if (index !== -1) {
      notes.value[index] = updatedNote
    }
  }

  // Acción: Eliminar una nota
  function deleteNote(id: string): void {
    notes.value = notes.value.filter((note: Note) => note.id !== id)
  }

  // Acción: Limpiar todas las notas
  function clearAllNotes(): void {
    notes.value = []
  }

  // Acción: Limpiar notas que contengan una etiqueta específica
  function clearNotesByTag(tag: string): void {
    notes.value = notes.value.filter((note: Note) => !note.tags.includes(tag))
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
