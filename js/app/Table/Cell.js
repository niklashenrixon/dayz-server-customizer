import React, { useContext } from 'react'
import { LayoutContext } from '../context'



export default ({ value, children, stiff = false }) => {
    const { columnWidth } = useContext(LayoutContext)
    const content = children ? children : value

    const style = {
        boxSizing: 'border-box',
        textAlign: 'left',
        padding: 3,
        overflow: stiff ? 'visible' : 'hidden',
        textOverflow: stiff ? 'inherit' : 'ellipsis',
        whiteSpace: stiff ? 'inherit' : 'nowrap'
    }

    return (
        <div style={{...style,  width: columnWidth}} title={content}>
            { content }
        </div>
    )
}