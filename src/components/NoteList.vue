<!-- src/components/NoteList.vue -->
<template>
  <div>
    <!-- Encabezado con título y botón para crear nota -->
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

    <div class="flex mr-5 ml-5">
      <!-- Controles Compactos -->
      <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <!-- Filtro por Etiqueta -->
        <div class="flex-1">
          <label for="filterTag" class="block text-gray-700 font-semibold text-sm mb-1">
            Filtrar por etiqueta:
          </label>
          <select
            id="filterTag"
            v-model="selectedTag"
            class="w-[150px] cursor-pointer border rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:border-blue-300 transition-colors"
          >
            <option value="">Todas</option>
            <option v-for="(count, tag) in noteStore.notesByTag" :key="tag" :value="tag">
              {{ tag }} ({{ count }})
            </option>
          </select>
        </div>

        <!-- Ordenar Notas -->
        <div class="flex-1">
          <label for="orderSelect" class="block text-gray-700 font-semibold text-sm mb-1">
            Ordenar por:
          </label>
          <select
            id="orderSelect"
            v-model="sortOrder"
            class="w-[150px] border rounded px-2 py-1 text-sm cursor-pointer focus:outline-none focus:ring focus:border-blue-300 transition-colors"
          >
            <option value="desc">Más reciente</option>
            <option value="asc">Más antiguo</option>
          </select>
        </div>

        <!-- Botones de Limpieza -->
        <div class="flex flex-col sm:flex-row gap-2 mt-5">
          <!-- Se muestra solo si NO se está filtrando por tag -->
          <button
            v-if="!selectedTag"
            @click="clearAll"
            class="border border-red-600 hover:bg-red-700 hover:text-white transition-colors text-gray-800 font-semibold text-sm px-3 py-1 rounded cursor-pointer"
          >
            Limpiar Todas las Notas
          </button>
          <!-- Se muestra solo cuando se ha seleccionado un tag -->
          <button
            v-if="selectedTag"
            @click="clearByTag"
            class="border border-red-600 hover:bg-red-700 hover:text-white transition-colors text-gray-800 font-semibold text-sm px-3 py-1 rounded cursor-pointer"
          >
            Limpiar Notas por Etiqueta
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de notas -->
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

    <!-- Mensaje si no hay notas -->
    <div v-else class="text-center text-gray-600">
      <p>No hay notas para mostrar.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NoteCard from './NoteCard.vue'
import { useNoteList } from '@/composables/useNoteList'

const {
  noteStore,
  selectedTag,
  sortOrder,
  sortedFilteredNotes,
  clearAll,
  clearByTag,
  deleteNote,
  getTagClasses,
} = useNoteList()
</script>
