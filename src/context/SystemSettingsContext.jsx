import { useState } from 'react'
import { createContext } from 'react'

export const SystemSettingsContext = createContext()

const SystemSettingsContextProvider = (props) => {
  const [settings, setSettings] = useState({
    realtimeData: false,
  })

  return (
    <SystemSettingsContext.Provider value={{ settings, setSettings }}>
      {props.children}
    </SystemSettingsContext.Provider>
  )
}

export default SystemSettingsContextProvider
