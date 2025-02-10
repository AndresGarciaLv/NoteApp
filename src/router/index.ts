// src/router/index.ts
import { createRouter, createWebHistory  } from 'vue-router'
import NoteList from '@/components/NoteList.vue'
import NoteForm from '@/components/NoteForm.vue'
import EditNote from '@/components/EditNote.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: NoteList
  },
  {
    path: '/create',
    name: 'CreateNote',
    component: NoteForm
  },
  {
    path: '/edit/:id',
    name: 'EditNote',
    component: EditNote,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
