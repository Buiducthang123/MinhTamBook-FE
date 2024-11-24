import type { IUser } from "~/interfaces/user"

export const useAuthStore = defineStore('auth',()=>{
  const user = ref<IUser>()
  const accessToken = useCookie<string|null>('access_token',{
      default: () => null,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Giải thích: 1000ms * 60s * 60m * 24h * 7d = 1 tuần,
      watch: true
  })

  const setUser = (newUser: IUser) => {
    user.value = newUser
  }

  const setAccessToken = (newAccessToken: string) => {
    accessToken.value = newAccessToken
  }


  return { 
    user,
    accessToken,
    setUser,
    setAccessToken,
  }
})