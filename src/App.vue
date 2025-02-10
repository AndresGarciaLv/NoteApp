<!-- src/App.vue -->
<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-md py-4">
      <div class="flex justify-between container mx-auto px-4">
        <router-link to="/">
          <h1 class="text-3xl font-bold text-blue-800 text-center">Aplicación de Notas</h1>
        </router-link>
        <h3 class="text-xl font-semibold text-blue-400">Garcia Leyva Andrés IDYGS81</h3>
      </div>
    </header>
    <main class="container mx-auto px-4 py-6">
      <router-view />
    </main>
  </div>
</template>
