import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'

const style = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 15,
    padding: 6
}

export default ({ children }) => 
    <VisibilitySensor partialVisibility>
        {
            ({ isVisible }) => 
                isVisible ?    
                     <div style={style}>
                         {children}
                    </div> 
                :
                    <div style={{ ...style, background: 'grey'}}> children</div>
        }
    </VisibilitySensor>
