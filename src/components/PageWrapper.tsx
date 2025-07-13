import { useTheme } from "../api-handlers/themeContext"
import React from "react"


export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <div className={`w-screen h-fit m-0 p-0 ${theme.background} ${theme.text}`}>
      {children}
    </div>
  )
}
