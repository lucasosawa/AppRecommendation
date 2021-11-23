import React, { useState } from 'react'

export const VagaContext = React.createContext([])

export const VagasProvider = ({ children }) => {
  const [vagas, setVagas] = useState(null)

  return (
    <VagaContext.Provider value={{vagas: [vagas, setVagas]}}>
      {children}
    </VagaContext.Provider>
  )
}
