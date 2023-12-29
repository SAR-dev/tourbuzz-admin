import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

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
    Fantasy = "fantasy",
    Wireframe = "wireframe",
    Black = "black",
    Luxury = "luxury",
    Dracula = "dracula",
    CMYK = "cmyk",
    Autumn = "autumn",
    Business = "business",
    Acid = "acid",
    Coffee = "coffee",
    Winter = "winter",
    Dim = "dim",
    Sunset = "sunset"
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
