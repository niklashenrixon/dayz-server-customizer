import React, { useContext } from 'react'
import { LayoutContext } from '../context'

const style = {
    boxSizing: 'border-box',
    textAlign: 'left',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: 3
}

export default ({ value, children }) => {
    const { columnWidth } = useContext(LayoutContext)
    const content = children ? children : value
    return (
        <div style={{...style,  width: columnWidth}} title={content}>
            { content }
        </div>
    )
}