import React, { useContext } from 'react'
import { ConfigContext } from '../context'
import Row from './Row'
import Cell from './Cell'

const Input = ({ value }) => <span>Input {value}</span>
const MultiSelect = ({ value }) => <span>MultiSelect {value}</span>
const ReadOnly = ({ value }) => <span>ReadOnly {value}</span>

const getControllType = (key, value, { columns }) => {
    const { type } = columns.find( def => def.name === key )
    if(type === 'readonly') { return <ReadOnly value={value} /> }
    if(type === 'multiselect') { return <MultiSelect value={value} /> }
    if(type === 'number') { return <Input value={value} /> }
    return <span>Undefined</span>
}

export default () => {
    const { definitions, data } = useContext(ConfigContext)
    const visibleColumns = definitions.columns.filter(column => column.visible)
    console.log('console', data)

    

    return (
        <div>
            {
                data.map(dataPoint => <Row key={dataPoint.name}>
                    { 
                        visibleColumns.map(({ name, value }) => {
                            const component = getControllType(name, dataPoint[name], definitions)
                            return <Cell key={`${name}`}>{component}</Cell>
                        }) 
                    }                
                </Row>)
            }
        </div>
    )     
}