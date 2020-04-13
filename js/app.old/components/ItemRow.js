import React from 'react'
import ItemCell from './ItemCell'
import { TYPES } from '../constants'

const rowStyle = {
    display: 'table-row',
    lineHeight: '35px',
    borderBottom: '1px solid rgb(29, 29, 29)'
}

const skeletonRowStyle = {
	...rowStyle, 
	height: '100%',
    height: '38px'
}

const skeletonValueStyle = {
	paddingLeft: '15px',
    fontSize: '14px'
}

export const SkeletonRow = ({ value }) => <div style={skeletonRowStyle}><span style={skeletonValueStyle}>{value}</span></div>

export default class ItemRow extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			...this.props 
		}
	}

	render() {
		const { name, nominal, min, restock, cost, category, lifetime, onChange  } = this.props;

		return <div style={{ ...rowStyle }}>
			<ItemCell value={name} style={{ fontSize: '14px' }} />
			<ItemCell onChange={ (value) => onChange(TYPES.MAX, value) } value={nominal} />
			<ItemCell onChange={ (value) => onChange(TYPES.MIN, value) } value={min} />
			<ItemCell onChange={ (value) => onChange(TYPES.PRIORITY, value) } character="%" max={100} value={cost} />
			<ItemCell onChange={ (value) => onChange(TYPES.RESTOCK, value) } character="s"  value={restock} />
			<ItemCell onChange={ (value) => onChange(TYPES.LIFETIME, value) } character="s"  value={lifetime} />
			<ItemCell value={category} />
		</div>
	}
}