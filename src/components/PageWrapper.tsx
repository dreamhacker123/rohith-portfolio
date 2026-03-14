import { useTheme } from "../api-handlers/themeContext"
import React from "react"


export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <div className={`w-full min-h-screen h-auto m-0 p-0 overflow-x-hidden bg-gradient-to-br from-black via-gray-900 to-black`}>
      {children}
    </div>
  )
}
