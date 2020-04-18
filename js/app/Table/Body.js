import React, { useContext } from 'react'
import { ConfigContext, DataContext } from '../context'
import Row from './Row'
import Cell from './Cell'

const Number = ({ value, name, propertyName }) => {
    const { handlers } = useContext(ConfigContext)
    return <input 
        type='number'
        value={value}
        style={{ width: '100%' }} 
        onChange={(e) => handlers.setValue(name, propertyName,  e.target.value)} 
    />
}

const MultiSelect = ({ values, options }) => 
    <select style={{ width: '100%', height: '100%' }}>
        { options.map(opt => <option key={opt} value={opt}>{opt}</option>) }
    </select>

const ReadOnly = ({ value }) => <span>{value}</span>

const getControllType = (id, key, value, columns) => {
    const { type, values: options } = columns.find( def => def.name === key )
    if(type === 'readonly') { return <ReadOnly value={value} /> }
    if(type === 'multiselect') {     
        return <MultiSelect values={value} options={options} /> 
    }
    if(type === 'number') { return <Number name={id} propertyName={key} value={value} /> }
    return <span>UNKNOWN TYPE</span>
}

const sorter = (trait, ascending) => (a, b) => { 
    if(a[trait] === null){
      return 1;
    }
    else if(b[trait] === null){
      return -1;
    }
    else if(a[trait] === b){
      return 0;
    }
    else if(ascending) {
      return parseInt(a[trait]) < parseInt(b[trait]) ? -1 : 1;
    }
    else if(!ascending) {
      return parseInt(a[trait]) < parseInt(b[trait]) ? 1 : -1;
    }
}	

export default () => {
    const { columns, order } = useContext(ConfigContext)
    const { data } = useContext(DataContext)
    const visibleColumns = columns.filter(column => column.visible)

    let toRender = data
    if (order.trait) {
        toRender = [...data].sort((a, b) => sorter(order.trait, order.ASC)(a, b))
    }

    return (
        <div>
            {
                toRender.map(dataPoint => <Row key={dataPoint.name}>
                    { 
                        visibleColumns.map(({ name, value }) => {
                            const component = getControllType(dataPoint.id, name, dataPoint[name], columns)
                            return <Cell stiff key={`${name}`}>{component}</Cell>
                        }) 
                    }                
                </Row>)
            }
        </div>
    )     
}