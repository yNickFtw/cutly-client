import { IUser } from '@/types/user/IUser'
import { create } from 'zustand'

type IUseUser = {
    user: IUser | null
    setUser: (user: IUser | null) => void
    getUser: () => IUser | null
}

const useUser = create<IUseUser>((set, get) => ({
    user: null,
    setUser: (user: IUser | null) => set({ user }),
    getUser: () => get().user,
}))

export default useUser;
