import { create } from 'zustand'

export enum PageName {
    Gallery = "Gallery",
    Writers = "Writers",
    Articles = "Articles",
    WriteArticle = "Write Article",
  }

type Store = {
    page: PageName
    setPage: (props: PageName) => void
}

export const usePageStore = create<Store>()((set) => ({
    page: PageName.Gallery,
    setPage: (props: PageName) => set(() => ({ page: props })),
}))
