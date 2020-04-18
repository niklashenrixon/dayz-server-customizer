import React, { useContext } from 'react'
import { ConfigContext, LayoutContext } from '../context'
import { getColumnWidth } from '../utils'
import Cell from './Cell'
import Row from './Row'

const VisibilityToggler = ({ name, visible, onChange }) => 
    <span onClick={() => onChange(name)}>
        { name } <input type="checkbox" checked={visible} />
    </span>

export default () => {
    const { columns, order, handlers } = useContext(ConfigContext)
    const visibleColumns = columns.filter(column => column.visible)
    const columnWidth = getColumnWidth(visibleColumns.length)
    return (
        <Row>
            { 
                visibleColumns.map(c => {
                    let orderIcon = ''

                    if (order.trait === c.name) {
                        if (order.ASC === true) { orderIcon = '▲'}
                        else if (order.ASC === false) { orderIcon = '▼'}
                    }

                    return <Cell 
                        value={`${orderIcon} ${c.name}`} 
                        key={c.name}
                        onClick={() => handlers.setColumnSort(c.name)} 
                        style={{ cursor: 'pointer' }}
                    />
                }
                )
            }
        </Row>
    )
}