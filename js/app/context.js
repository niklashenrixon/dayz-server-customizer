import React from 'react'

export const DataContext = React.createContext({ data: [], handlers: {} })
export const ConfigContext = React.createContext({})
export const LayoutContext = React.createContext({
    columnWidth: '25%'
})
