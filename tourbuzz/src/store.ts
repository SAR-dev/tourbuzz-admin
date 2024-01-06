import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { DistrictType } from './constants/types'

// ThemeStore
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

// EmojiStore
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

// NavStore

const navKey = "sidenav"

type NavStore = {
    open: boolean
    toogleOpen: () => void
}

export const useNavStore = create<NavStore>()(
    persist(
    (set) => ({
        open: false,
        toogleOpen: () => {
            set((state) => ({ open: !state.open }))
        },
    }), {
        name: navKey,
        storage: createJSONStorage(() => localStorage),
    })
)
