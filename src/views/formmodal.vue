<script setup>
import { computed } from 'vue'
const props = defineProps({ modalopen: Boolean })


</script>



<template>
  <form
      @submit.prevent="Addpost"
      class="bg-gray-200 rounded-xl shadow-lg w-full max-w-lg p-6 space-y-5 z-50 relative"
    >
      <div class="flex justify-between items-center border-b border-gray-300 pb-3 mb-4">
        <h2 class="text-lg font-semibold text-gray-800">New Postits</h2>
        <button
          type="button"
          @click="$emit('closemodal')"
          class="text-gray-500 hover:text-red-500 transition-colors"
        >
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          v-model="newtodo"
          type="text"
          placeholder="Add a task"
          class="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white h-11 px-3 text-gray-800"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
        <textarea
          v-model="newcontent"
          placeholder="Describe your note"
          rows="5"
          class="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white px-3 py-2 text-gray-800 resize-none"
        ></textarea>
      </div>

      <div class="flex justify-end space-x-3 pt-3">
        <button
          class="bg-gray-300 hover:bg-gray-200 font-bold py-2 px-5 rounded cursor-pointer text-gray-600"
          @click="$emit('closemodal')"
        >
          Cancel
        </button>

        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded cursor-pointer flex items-center"
          @click="$emit('addelemt')"
        >
          <i class="fa-solid fa-plus mr-2"></i> Add
        </button>
      </div>
    </form>
</template>
