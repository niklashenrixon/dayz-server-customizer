import React, { useContext, useEffect } from 'react'
import MOCKDATA from './MOCKDATA'

import { ConfigContext, LayoutContext, DataContext } from './context'
import { getColumnWidth } from './utils'
import { THead, TBody } from './Table'

export default () => {
    const { definitions: inputDefinitions, data: inputData } = MOCKDATA

    console.log('Initializing')
    console.log('definitions', inputDefinitions)
    console.log('data', inputData)

    const [config, setConfig] = React.useState({
        ...inputDefinitions,
        order: { trait: 'name', ASC: true}
    })
    const [data, setData] = React.useState([ ...inputData ])
    const [layout, setLayout] = React.useState({ columnWidth: '10%' })

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

    useEffect(() => {
        setColumnWidth()
    }, [])

    return (
        <ConfigContext.Provider value={{
            ...config,
            handlers: { 
                setVisibleColumn,
                setValue,
                setColumnSort
             }
        }}>
            <DataContext.Provider value={{ data }}>
                <LayoutContext.Provider value={layout}>
                    <THead />
                    < TBody />
                </LayoutContext.Provider>
            </DataContext.Provider>
        </ConfigContext.Provider>
    )
}
