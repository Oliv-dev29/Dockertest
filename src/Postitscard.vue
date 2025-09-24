<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="">
    <div class="shadow-lg mt-10 rounded-2xl mr-3 ml-3 p-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl" :class="bgColor">
      <div class="space-x-2">
        <RouterLink :to="`/note/${todo._id}`">
          <button
            class="font-bold py-1 px-2 rounded cursor-pointer text-gray-400 outline-1 outline-gray-300"
            title="See more"
            type="button"
          >
            <i class="fa-regular fa-eye"></i>
          </button>
        </RouterLink>
      </div>
      <div class="px-6 py-4 max-w">
        <div class="font-bold text-lg mb-2">{{ cuttitle }}</div>
        <p class="text-gray-700 text-base">{{ sub }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const colors = [
  'bg-[#FEF3C7]',
  'bg-[#D1FAE5]',
  'bg-[#E0F2FE]',
  'bg-[#FFEDD5]',
  'bg-[#FFE4E6]',
  'bg-[#EDE9FE]',
  'bg-[#F97316]',
  'bg-[#8B5CF6]',
  'bg-[#E0F2FE]',
  'bg-[#10B981]',
  'bg-[#3B82F6]',
  'bg-[#F97316]',
  'bg-[#B45309]',
  'bg-[#DC2626]',
  'bg-[#3B82F6]',
]

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}
const bgColor = getRandomColor()
const props = defineProps({ todo: Object })
const sub = computed(() => {
  const content = props.todo.content[0]
  return content.length > 20 ? content.slice(0, 20) + '...' : content
})
const cuttitle = computed(() => {
  const title = props.todo.title
  return title.length > 10 ? title.slice(0, 10) + '...' : title
})
</script>
