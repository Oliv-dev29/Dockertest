<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded overflow-hidden shadow-xl m-auto mt-8 transition-transform duration-300 transform hover:scale-105 bg-yellow-100 hover:bg-yellow-200"
    v-if="todo && todo.content && todo.title">

    <div class="bg-none p-2 rounded-full hover:text-red-700">
  <RouterLink :to="{ name: 'home' }">
    <img
      src="https://cdn-icons-png.flaticon.com/512/54/54623.png"
      class="w-8 h-8 object-cover cursor-pointer"
      alt="Back to all post-its"
      title="Back to all post-its"
    />
  </RouterLink>
</div>


    <div class="px-4 sm:px-6 md:px-8 py-4">
      <div class="font-bold text-lg sm:text-xl md:text-2xl mb-2">{{ todo.title }}</div>
      <p class="text-gray-700 text-base sm:text-lg">{{ todo.content[0] }}</p>
    </div>
    <div class="px-6 pt-4 pb-2 flex flex-wrap justify-end space-x-2">
      <button
        @click="openModal()"
        class="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded cursor-pointer"
        title="Edit"
        type="button"
      >
        <i class="fa-regular fa-pen-to-square"></i>
      </button>

      <button
        @click="deleteNote()"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer ml-4"
        title="Delete"
      >
        <i class="fa fa-trash text-white"></i>
      </button>
    </div>
  </div>

  <div v-else>
    <RouterLink :to="{ name: 'home' }">
      <button class="bg-white text-black p-2">
        <img src="https://cdn-icons-png.flaticon.com/512/54/54623.png" class="w-8 h-8 object-cover" alt="" />
      </button>
    </RouterLink>
    <p>Postit not found</p>
  </div>

  <div
    v-if="modalopen"
    class="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-40"
  >
    <form
      @submit.prevent="updateNote()"
      class="bg-gray-200 rounded-xl shadow-lg w-full max-w-lg sm:max-w-md md:max-w-lg p-4 sm:p-6 space-y-5 z-50 relative mx-2 sm:mx-auto"
    >
      <div class="flex justify-between items-center border-b border-gray-300 pb-3 mb-4">
        <h2 class="text-lg font-semibold text-gray-800">Edit Note</h2>
        <button
          type="button"
          @click="closeModal()"
          class="text-gray-500 hover:text-red-500 transition-colors"
        >
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          v-model.trim="newtitle"
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
          @click="closeModal()"
        >
          Cancel
        </button>

        <button
          type="submit"
          class="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded flex items-center"
        >
          <i class="fa-solid fa-plus mr-2"></i> Save
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { usePostit } from '@/stores/Postit'
const store = usePostit()
const route = useRoute()
const router = useRouter()
const id = route.params.id
const modalopen = ref(false)
const todo = ref([])
const openModal = () => {
  modalopen.value = true
  newtitle.value = todo.value.title
  newcontent.value = todo.value.content[0]
}
const closeModal = () => {
  modalopen.value = false
}
onMounted(async () => {
  // Récupère les posts depuis le store
  await store.getPosts()  // rafraîchir depuis l'API
  const found = store.postit.find((n) => n.id === id)

  if (found) {
    found.content = Array.isArray(found.content) ? found.content : [found.content || '']
    todo.value = found
  } else {
    todo.value = { content: [''] }
  }
})
const newtitle = ref('')
const newcontent = ref('')


const updateNote = async () => {
  if (newtitle.value.trim() && !newcontent.value.trim().length > 0) return
  const retour = await store.updatePostit(todo.value._id, {
    _id: todo.value._id,
    title: newtitle.value,
    content: [newcontent.value],
  })

  if (!retour) return
  const index = store.postit.findIndex((n) => n._id === todo.value._id)
  if (index !== -1) {
    store.postit[index] = { ...store.postit[index], title: newtitle.value, content: [newcontent.value] }
    todo.value = store.postit[index]
  }

  closeModal()
  newtitle.value = ''
  newcontent.value = ''
}

const deleteNote = async () => {
  if (confirm('Do you like to delete this post-it ?')) {
    const retour = await store.DeletePostit(todo.value.id)
    console.log(retour)
    if (!retour) return
    router.push({ name: 'home' })
  }
}
</script>
