import { create } from 'zustand'

type Store = {
    page: string
    setPage: (props: string) => void
}

export const usePageStore = create<Store>()((set) => ({
    page: "",
    setPage: (props: string) => set(() => ({ page: props })),
}))
