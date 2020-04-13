import React from 'react'

const style = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 15,
    padding: 6
}

export default ({ children }) => 
    <div style={style}>
        {children}
    </div>