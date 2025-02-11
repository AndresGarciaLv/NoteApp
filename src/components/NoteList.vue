
<template>
  <div>

    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
      <h2 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
        Notas (Total: {{ noteStore.totalNotes }})
      </h2>
      <router-link to="/create">
        <button class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded cursor-pointer transition-colors">
          Crear Nota
        </button>
      </router-link>
    </div>

    <div class="mr-5 ml-5">
      <NoteListControls
        :notesByTag="noteStore.notesByTag"
        :selectedTag="selectedTag"
        :sortOrder="sortOrder"
        :searchQuery="searchQuery"
        @update:selectedTag="selectedTag = $event"
        @update:sortOrder="sortOrder = $event"
        @update:searchQuery="searchQuery = $event"
        @clearAll="clearAll"
        @clearByTag="clearByTag"
      />
    </div>

    <div v-if="sortedFilteredNotes.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="note in sortedFilteredNotes" :key="note.id">
        <NoteCard>
          <template #header>
            <div class="flex flex-col">
              <h3 class="text-xl font-bold text-gray-800">{{ note.title }}</h3>
              <small class="text-gray-500">{{ new Date(note.createdAt).toLocaleString() }}</small>
            </div>
          </template>
          <template #content>
            <p class="text-gray-700">{{ note.content }}</p>
            <div class="mt-2 flex flex-wrap items-center gap-2">
              <strong class="text-sm text-gray-600">Etiquetas:</strong>
              <template v-for="tag in note.tags" :key="tag">
                <span :class="getTagClasses(tag)">
                  {{ tag }}
                </span>
              </template>
            </div>
          </template>
          <template #footer>
            <div class="flex gap-2">
              <router-link :to="`/edit/${note.id}`">
                <button class="bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-colors text-white font-semibold py-1 px-3 rounded">
                  Editar
                </button>
              </router-link>
              <button
                @click="deleteNote(note.id)"
                class="bg-red-500 hover:bg-red-700 cursor-pointer transition-colors text-white font-semibold py-1 px-3 rounded"
              >
                Eliminar
              </button>
            </div>
          </template>
        </NoteCard>
      </div>
    </div>

   
    <div v-else class="text-center text-gray-600">
      <p>No hay notas para mostrar.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>

import NoteCard from './NoteCard.vue'
import NoteListControls from './NoteListControls.vue'
import { useNoteList } from '@/composables/useNoteList'

const {
  noteStore,
  selectedTag,
  sortOrder,
  searchQuery,
  sortedFilteredNotes,
  clearAll,
  clearByTag,
  deleteNote,
  getTagClasses,
} = useNoteList()
</script>
