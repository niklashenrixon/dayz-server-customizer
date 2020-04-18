import React from 'react'

export const DataContext = React.createContext({ 
    data: [], 
    handlers: {}
 })

export const ConfigContext = React.createContext({
    order: { trait: 'name', ASC: true}
})

export const LayoutContext = React.createContext({
    columnWidth: '25%'
})
