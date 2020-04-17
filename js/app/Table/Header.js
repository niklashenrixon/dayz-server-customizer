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
    const { columns, handlers } = useContext(ConfigContext)
    const visibleColumns = columns.filter(column => column.visible)
    const columnWidth = getColumnWidth(visibleColumns.length)
    return (
        <Row>
            { 
                visibleColumns.map(c => <Cell value={c.name} key={c.name} />)
            }
        </Row>
    )
}