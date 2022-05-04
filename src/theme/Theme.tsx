import {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material";

export type Mode = 'dark' | 'light'

interface ITheme {
    theme: Mode,
    setTheme: Dispatch<SetStateAction<Mode>>
    toggleTheme: () => void
}

const defaultTheme: ITheme = {
    theme: "light",
    setTheme: (value) => {
    },
    toggleTheme: () => {
    }
}
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        // text:{
        //     primary: '#66bb6a',
        //     secondary: '#aed581'
        // }
    },

})
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#ffffff',
            contrastText: '#000000',
        },
        secondary: {
            main: '#ff8a00',
        },
        // text:{
        //     primary: '#2e7d32',
        //     secondary: '#558b2f'
        // }
    },
})

const ThemeContext = createContext(defaultTheme);
export const useTheme = () => useContext(ThemeContext);

export const Theme: FC<{ children: ReactNode }> = ({children}) => {
    const [theme, setTheme] = useState<Mode>(localStorage.getItem('pro-theme') as Mode || 'light');

    return <ThemeContext.Provider
        value={{
            theme: theme,
            setTheme: (theme) => {
                localStorage.setItem('pro-theme', theme as any)
                setTheme(theme)
            },
            toggleTheme: () => {
                localStorage.setItem('pro-theme', theme === 'light' ? 'dark' : 'light')
                setTheme(theme === 'light' ? 'dark' : 'light')
            }
        }}>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            {children}
        </ThemeProvider>
    </ThemeContext.Provider>
}