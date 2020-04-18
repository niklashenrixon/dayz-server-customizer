import React, { useContext, useEffect } from 'react'
import MOCKDATA from './MOCKDATA'

import { ConfigContext, LayoutContext, DataContext, themeBright, themeDark } from './context'
import { getColumnWidth } from './utils'
import { THead, TBody } from './Table'

export default () => {
    const { definitions: inputDefinitions, data: inputData } = MOCKDATA

    console.log('Initializing')
    console.log('definitions', inputDefinitions)
    console.log('data', inputData)

    const [config, setConfig] = React.useState({})

    const [data, setData] = React.useState([ ...inputData ])
    const [layout, setLayout] = React.useState({ theme: { styleSheet: {} } })

    const setValue = (id, property, newValue) => {
        const newData = data.map( d => {
            if (d.id === id) {
                d[property] = newValue
            }
            return d
        })

        setData(newData)
    }

    const setColumnWidth = () => {
        const newColumnWidth = 100 / inputDefinitions.columns.filter(c => c.visible).length
        setLayout({
            ...layout,
            columnWidth: `${newColumnWidth}%`
        })       
    }

    const setColumnSort = (trait) => {
        const { trait: currentTrait, ASC } = config.order
        const newOrder = { trait: currentTrait, ASC: true }

        if (currentTrait === trait) {
            if (ASC === true) {
                newOrder.ASC = false
            } else if (ASC === false) {
                const defaultTrait = 
                newOrder.trait = null
                newOrder.ASC = null
            }
        } else {
            newOrder.trait = trait
        }

        setConfig({
            ...config,
            order: newOrder
        })
    }

    const setVisibleColumn = name => {
        const newColumns = config.definitions.columns.map(column => {
            if (column.name === name) {
                column.visible = !column.visible
            }
            return column
        })
        setConfig({ 
            ...config, 
            definitions: {
                ...config.definitions,
                columns: newColumns
            }
        })
    }

    const toggleTheme = () => {
        const newTheme = layout.theme.styleSheet === themeBright ? themeDark : themeBright
        console.log('ToggleTheme')
       setLayout({
           ...layout,
           theme: {
               ...layout.theme,
               styleSheet: newTheme
           }
       })
   }

   const setFilter = search => {
       console.log('Updating search', search)
       setConfig({
           ...config,
           filter: search
       })
   }

    useEffect(() => {
        setColumnWidth()
    }, [])

    return (
        <ConfigContext.Provider value={{
            ...config,
            ...inputDefinitions,
            order: { trait: 'name', ASC: true},
            handlers: { 
                setVisibleColumn,
                setValue,
                setColumnSort,
                setFilter
             }
        }}>
            <DataContext.Provider value={{ data }}>
                <LayoutContext.Provider value={{
                    ...layout,
                    columnWidth: '10%',
                    theme: {
                        toggleTheme,
                        styleSheet: themeBright
                    }
                }}>
                    <div style={{ ...layout.theme.styleSheet.body}}>
                        <THead />
                        <TBody />
                        <input onChange={e => setFilter(e.target.value)} value={config.filter} type="text" />
                    </div>

                </LayoutContext.Provider>
            </DataContext.Provider>
        </ConfigContext.Provider>
    )
}
