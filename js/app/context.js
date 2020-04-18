import React from 'react'

export const themeBright = {
    body: {
        backgroundColor: '#fff',
        color: '#000',
        transition: 'backgroundColor 2s'
    }
}

export const themeDark = {
    body: {
        backgroundColor: '#000e',
        color: 'red',
        transition: 'backgroundColor 2s'
    }
}

export const DataContext = React.createContext({ 
    data: [], 
    handlers: {}
 })

export const ConfigContext = React.createContext({
    order: { trait: 'name', ASC: true}
})

export const LayoutContext = React.createContext({
    columnWidth: '25%',
    theme: {
        styleSheet: themeDark
    }
})