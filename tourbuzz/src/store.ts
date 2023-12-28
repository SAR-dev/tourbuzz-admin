import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export enum ThemeName {
    Black = "black",
    Dark = "dark",
    Retro = "retro",
    Cyberpunk = "cyberpunk",
    Valentine = "valentine",
    Aqua = "aqua",
    Light = "light"
}

const themeKey = "theme"

type Store = {
    theme: ThemeName
    setTheme: (props: ThemeName) => void
}

export const useThemeStore = create<Store>()(
    persist(
        (set) => ({
            theme: ThemeName.Black,
            setTheme: (value: ThemeName) => {
                set(() => ({ theme: value }))
                document.querySelector('html')?.setAttribute('data-theme', value)
            },
        }), {
            name: themeKey, 
            storage: createJSONStorage(() => localStorage),
    })
)
