<script setup>
import Postitscard from '@/Postitscard.vue'
import { usePostit } from '@/stores/Postit'
import { storeToRefs } from 'pinia'
const storePostit = usePostit()
const { postit } = storeToRefs(storePostit)


import { computed, onMounted, ref} from 'vue'

const newtodo = ref('')
const newcontent = ref('')

const Addtodo = async () => {
  if (newtodo.value.trim().length > 0 && newcontent.value.trim().length > 0) {
    await storePostit.addPost({
    title: newtodo.value,
    content: [newcontent.value],
  })
  newtodo.value = ''
  newcontent.value = ''
  modalopen.value = false
  location.reload()
  } else {
    console.log("incorrect title or content")
  }
}


const modalopen = ref(false)

onMounted(async () => {
  postit.value = await storePostit.getPosts()
})

const deleteAll = () => {
  if (postit.value.length === 0) {
    alert('Nothing to delete')
    return
  }
  if (confirm('Do you want to delete all post-it ?')) {
    storePostit.deleteAll()
    localStorage.removeItem('posts')
  }
}


const sortedTodo = computed(() => {
  if (!Array.isArray(postit.value)) return []
  return [...postit.value].sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1))
})

</script>

<template>
  <header>
    <div>
      <nav class="shadow-lg px-4 sm:px-6 md:px-8 py-4 flex flex-col items-center">
        <div class="flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-5">
          <img src="../assets/Pictures/sketchbook.png" class="w-10 h-8 mr-2" alt="" />
          <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-center">My Post-Its</h1>
        </div>

        <h2 class="text-sm sm:text-base md:text-lg text-gray-600 text-center mt-2">
          Organize your ideas more easily and efficiently
        </h2>
      </nav>
    </div>
  </header>
  <div class="flex items-center justify-center mt-10 space-x-6">
    <button
      class="bg-white text-blue-500 font-semibold py-2 px-7 rounded-lg shadow-md border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors duration-200"
      type="button"
      @click="modalopen = true"
    >
      AddPost
    </button>

    <button
      @click="deleteAll()"
      class="bg-white text-red-600 font-semibold py-2 px-7 rounded-lg shadow-md border border-gray-300 hover:border-red-500 hover:text-red-700 transition-colors duration-200"
    >
      Delete All
    </button>
  </div>

  <!-- <formmodal v-if="modalopen" @closemodal="modalopen = false" @addelemt="Addtodo()"/> -->
  <div v-if="postit.length == 0" class="text-center mt-20 text-gray-400">You have no tasks</div>

  <div
    v-else
    class="grid md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-2 sm:mx-3 md:px-15 lg:px-15 opacity-75"
  >
    <Postitscard v-for="todo in sortedTodo" v-bind:key="todo.id" :todo="todo" />
  </div>

  <div
    v-if="modalopen"
    class="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-40"
  >
    <form

      class="bg-gray-200 rounded-xl shadow-lg w-full max-w-lg sm:max-w-md md:max-w-lg p-4 sm:p-6 space-y-5 z-50 relative mx-2 sm:mx-auto"
    >
      <div class="flex justify-between items-center border-b border-gray-300 pb-3 mb-4">
        <h2 class="text-lg font-semibold text-gray-800">New Postits</h2>
        <button
          type="button"
          @click="modalopen = false"
          class="text-gray-500 hover:text-red-500 transition-colors"
        >
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          v-model.trim="newtodo"
          type="text"
          placeholder="Add a task"
          class="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white h-11 px-3 text-gray-800"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
        <textarea
          v-model.trim="newcontent"
          placeholder="Describe your note"
          rows="5"
          class="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white px-3 py-2 text-gray-800 resize-none"
        ></textarea>
      </div>

      <div class="flex justify-end space-x-3 pt-3">
        <button
          class="w-full sm:w-auto bg-gray-300 hover:bg-gray-200 font-bold py-2 px-5 rounded cursor-pointer text-gray-600"
          @click="modalopen = false"
        >
          Cancel
        </button>

        <button
          type="button"
          class="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded flex items-center"
          @click="Addtodo()"
        >
          <i class="fa-solid fa-plus mr-2"></i> Add
        </button>
      </div>
    </form>
  </div>
</template>
