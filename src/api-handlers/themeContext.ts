import { createContext, useContext } from "react"
import { darkTheme, lightTheme } from "./../constants"

export const ThemeContext = createContext(darkTheme)
export const useTheme = () => useContext(ThemeContext) || lightTheme
