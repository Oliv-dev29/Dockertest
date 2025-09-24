import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const usePostit = defineStore(
  'Postit',
  () => {
    const postit = ref([])
    const getPosts = async () => {
      try {
        const result = await fetch('https://post-it.epi-bluelock.bj/notes')
        if (!result.ok) throw new Error('Data not found')
        const data = await result.json()
        postit.value = data.notes.map((item) => ({
          ...item,
          id: item._id,
        }))
        console.log(data.notes)
        return data.notes
      } catch (error) {
        console.warn(error)
      }
    }
    const addPost = async (newnote) => {
      const result = await fetch('https://post-it.epi-bluelock.bj/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newnote),
      })
      const retour = await result.json()
      newnote.id = retour.note_id || retour._id
      newnote.date = Date.now()
      postit.value.push(newnote)
      return newnote
    }
    const getPostit = (id) => {
      const mypostit = ref([])
      mypostit.value = JSON.parse(postit.value.find((n) => n._id === id))
      console.log(mypostit.value)
      return mypostit
    }

    const updatePostit = async (id, updatenote) => {
      const API_URL = 'https://post-it.epi-bluelock.bj/notes'
      const index = postit.value.findIndex((n) => n._id == id)
      if (index !== -1) {
        const result = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: updatenote.title,
            content: updatenote.content,
          }),
        })
        if (!result.ok) return
        postit.value[index] = updatenote
        return result.json()
      }
    }




    const DeletePostit = async (id) => {
      const API_URL = 'https://post-it.epi-bluelock.bj/notes'
      const result = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!result.ok) return
      postit.value = postit.value.filter((n) => n.id !== id)
      return true
    }
    const deleteAll = () => {
      postit.value = []
    }
    return {
      deleteAll,
      getPosts,
      postit,
      addPost,
      getPostit,
      updatePostit,
      DeletePostit,
    }
  },
  {
    persist: {
      key: 'posts',
    },
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePostit, import.meta.hot))
}
