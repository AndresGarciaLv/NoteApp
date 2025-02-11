
<template>
  <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">

    <div class="flex-1">
      <label for="searchInput" class="block text-gray-700 font-semibold text-sm mb-1">
        Buscar:
      </label>
      <input
        id="searchInput"
        type="text"
        v-model="localSearchQuery"
        @input="emitSearchChange"
        placeholder="Buscar notas..."
        class="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:border-blue-300 transition-colors"
      />
    </div>

    <div class="flex-1">
      <label for="filterTag" class="block text-gray-700 font-semibold text-sm mb-1">
        Filtrar por etiqueta:
      </label>
      <select
        id="filterTag"
        v-model="localSelectedTag"
        @change="emitTagChange"
        class="w-[150px] cursor-pointer border rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:border-blue-300 transition-colors"
      >
        <option value="">Todas</option>
        <option v-for="(count, tag) in notesByTag" :key="tag" :value="tag">
          {{ tag }} ({{ count }})
        </option>
      </select>
    </div>

    <div class="flex-1">
      <label for="orderSelect" class="block text-gray-700 font-semibold text-sm mb-1">
        Ordenar por:
      </label>
      <select
        id="orderSelect"
        v-model="localSortOrder"
        @change="emitOrderChange"
        class="w-[150px] border rounded px-2 py-1 text-sm cursor-pointer focus:outline-none focus:ring focus:border-blue-300 transition-colors"
      >
        <option value="desc">Más reciente</option>
        <option value="asc">Más antiguo</option>
      </select>
    </div>

    <div class="flex flex-col sm:flex-row gap-2 mt-5">
      <button
        v-if="!localSelectedTag"
        @click="emitClearAll"
        class="border border-red-600 hover:bg-red-700 hover:text-white transition-colors text-gray-800 font-semibold text-sm px-3 py-1 rounded cursor-pointer"
      >
        Limpiar Todas las Notas
      </button>
      <button
        v-if="localSelectedTag"
        @click="emitClearByTag"
        class="border border-red-600 hover:bg-red-700 hover:text-white transition-colors text-gray-800 font-semibold text-sm px-3 py-1 rounded cursor-pointer"
      >
        Limpiar Notas por Etiqueta
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

interface Props {
  notesByTag: Record<string, number>
  selectedTag: string
  sortOrder: string
  searchQuery: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:selectedTag', value: string): void
  (e: 'update:sortOrder', value: string): void
  (e: 'update:searchQuery', value: string): void
  (e: 'clearAll'): void
  (e: 'clearByTag'): void
}>()


const localSelectedTag = ref(props.selectedTag)
const localSortOrder = ref(props.sortOrder)
const localSearchQuery = ref(props.searchQuery)

watch(() => props.selectedTag, newVal => localSelectedTag.value = newVal)
watch(() => props.sortOrder, newVal => localSortOrder.value = newVal)
watch(() => props.searchQuery, newVal => localSearchQuery.value = newVal)

function emitTagChange() {
  emit('update:selectedTag', localSelectedTag.value)
}

function emitOrderChange() {
  emit('update:sortOrder', localSortOrder.value)
}

function emitSearchChange() {
  emit('update:searchQuery', localSearchQuery.value)
}

function emitClearAll() {
  emit('clearAll')
}

function emitClearByTag() {
  emit('clearByTag')
}
</script>
