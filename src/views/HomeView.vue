<template>
  <NoteForm />
  <NoteList />
  <FilterTags />
</template>

<script setup lang="ts">
import FilterTags from '@/components/FilterTags.vue'
import NoteForm from '../components/NoteForm.vue'
import NoteList from '../components/NoteList.vue'
</script>
