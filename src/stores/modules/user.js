import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetUserInfo } from '@/api/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref({})
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const getUser = async () => {
      const {
        data: { data }
      } = await userGetUserInfo()
      user.value = data
    }
    const setUser = (obj) => {
      user.value = obj
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true // 持久化
  }
)
