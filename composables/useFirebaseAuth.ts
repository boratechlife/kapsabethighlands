import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User} from 'firebase/auth'

export default function() {
  const { $auth } = useNuxtApp()

  const user = useState<Object | null>("fb_user", () => null )
  console.log("user",user)
  const registerUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const userCreds = await createUserWithEmailAndPassword($auth, email, password)
      if (userCreds) {
        user.value = userCreds.user
        return true
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // handle error
      }
      return false
    }
    return false
  }

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const userCreds = await signInWithEmailAndPassword($auth, email, password)
      if (userCreds) {
        user.value = userCreds.user
        localStorage.setItem('user', JSON.stringify(userCreds.user))
        return true
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // handle error
        
      }
      return false
    }
    return false
  }

  return {
    user,
    registerUser,
    loginUser
  }
}
