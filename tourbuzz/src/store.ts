import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export enum ThemeName {
    Cupcake = "cupcake",
    Corporate = "corporate",
    Retro = "retro",
    Cyberpunk = "cyberpunk",
    Halloween = "halloween",
    Garden = "garden",
    Forest = "forest",
    Lofi = "lofi",
    Black = "black",
    Luxury = "luxury",
    Business = "business",
    Coffee = "coffee",
    Winter = "winter",
    Dim = "dim",
    Sunset = "sunset"
}

const themeKey = "theme"

type ThemeStore = {
    theme: ThemeName
    setTheme: (props: ThemeName) => void
}

export const useThemeStore = create<ThemeStore>()(
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

type EmojiStore = {
    open: boolean
    toogleOpen: () => void
}

export const useEmojiStore = create<EmojiStore>()(
    (set) => ({
        open: false,
        toogleOpen: () => {
            set((state) => ({ open: !state.open }))
        },
    })
)
