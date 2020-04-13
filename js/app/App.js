import React, { useContext, useEffect } from 'react'
import MOCKDATA from './MOCKDATA'

import { ConfigContext, LayoutContext } from './context'
import { getColumnWidth } from './utils'
import { THead, TBody } from './Table'

export default () => {
    const [config, setConfig] = React.useState(MOCKDATA)
    const [layout, setLayout] = React.useState({ columnWidth: '10%' })
 
    const setColumnWidth = () => {
        const newColumnWidth = 100 / config.definitions.columns.filter(c => c.visible).length
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
            handlers: { setVisibleColumn }
        }}>
            <LayoutContext.Provider value={layout}>
                <THead />
                <TBody />
            </LayoutContext.Provider>
        </ConfigContext.Provider>
    )
}
