// src/stores/tagStore.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTagStore = defineStore('tags', () => {
  const tags = ref<string[]>(['Personal', 'Trabajo', 'Urgente'])

  // Carga inicial desde localStorage (si existe)
  const savedTags = localStorage.getItem('tags')
  if (savedTags) {
    try {
      tags.value = JSON.parse(savedTags)
    } catch (error) {
      console.error('Error al parsear las etiquetas desde localStorage', error)
    }
  }

  // Persiste cambios en localStorage
  watch(
    tags,
    (newTags) => {
      localStorage.setItem('tags', JSON.stringify(newTags))
    },
    { deep: true }
  )

  function addTag(newTag: string) {
    if (newTag && !tags.value.includes(newTag)) {
      tags.value.push(newTag)
    }
  }

  function updateTag(oldTag: string, newTag: string) {
    const index = tags.value.findIndex(tag => tag === oldTag)
    if (index !== -1) {
      tags.value[index] = newTag
    }
  }

  function removeTag(tagToRemove: string) {
    tags.value = tags.value.filter(tag => tag !== tagToRemove)
  }

  return { tags, addTag, updateTag, removeTag }
})
