import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// AuthStore
export const authTokenKey = "theme"

type AuthtSore = {
    token: string | null
    setToken: (props: string) => void
}

export const useAuthStore = create<AuthtSore>()(
    persist(
        (set) => ({
            token: null,
            setToken: (value: string) => {
                set(() => ({ token: value }))
            },
        }), {
        name: authTokenKey,
        storage: createJSONStorage(() => localStorage),
    })
)

// ThemeStore
export enum ThemeName {
    Light = "light",
    Dark = "dark",
    Cupcake = "cupcake",
    Bumblebee = "bumblebee",
    Emerald = "emerald",
    Corporate = "corporate",
    Synthwave = "synthwave",
    Retro = "retro",
    Cyberpunk = "cyberpunk",
    Valentine = "valentine",
    Halloween = "halloween",
    Garden = "garden",
    Forest = "forest",
    Aqua = "aqua",
    Lofi = "lofi",
    Pastel = "pastel",
    Fantasy = "fantasy",
    Wireframe = "wireframe",
    Black = "black",
    Luxury = "luxury",
    Dracula = "dracula",
    CMYK = "cmyk",
    Autumn = "autumn",
    Business = "business",
    Acid = "acid",
    Lemonade = "lemonade",
    Night = "night",
    Coffee = "coffee",
    Winter = "winter",
    Dim = "dim",
    Nord = "nord",
    Sunset = "sunset",
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
