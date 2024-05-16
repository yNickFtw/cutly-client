import { create } from 'zustand'

type IUseAuth = {
    isLoggedIn: boolean;
    setIsLoggedIn: (token: string) => void;
    logout: () => void;
    getIsLoggedIn: () => boolean;
}

const useAuth = create<IUseAuth>((set, get) => ({
    isLoggedIn: !!localStorage.getItem('token'),

    setIsLoggedIn: (token: string) => {
        localStorage.setItem('token', token);
        set({ isLoggedIn: true });
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ isLoggedIn: false });
    },

    getIsLoggedIn: () => get().isLoggedIn,
}))

export default useAuth;

