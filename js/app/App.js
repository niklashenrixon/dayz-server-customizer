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

    const [config, setConfig] = React.useState(inputDefinitions)
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
                setValue
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
