// import { defineStore } from 'pinia'
// import { computed, ref } from 'vue'

// export const useNotes = defineStore(
//   'notes',
//   () => {
//     const notes = ref([])
//     const getNotes = () => {
//         notes.value
//     }
//     const addNote = (newnote) => {
//       notes.value.push(newnote)
//     }
//     const getNotebyId = (id) => {
//       return notes.value.find((n) => n.id == id)
//     }
//     const EditNote = (id, updatenote) => {
//       const index = notes.value.findIndex((n) => n.id == id)
//       if (index !== -1) {
//         notes.value[index] = updatenote
//       }
//     }
//     const DeleteNote = (id) => {
//       notes.value = notes.value.filter((n) => n.id !== id)
//     }

//     return {
//       notes,
//       getNotes,
//       addNote,
//       getNotebyId,
//       EditNote,
//       DeleteNote,
//     }
//   },
//   {
//     persist: {
//       key: 'notes',
//     }
//   },
// )
