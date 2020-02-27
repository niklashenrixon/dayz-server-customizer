import React from 'react'
import ItemCell from './ItemCell'

const rowStyle = {
    display: 'table-row',
    lineHeight: '35px',
    borderBottom: '1px solid rgb(29, 29, 29)'
}

const cellStyle = {
	display: 'table-cell',
	paddingLeft: '15px',
	maxWidth: '150px'
}

export default class HeaderRow extends React.Component {
	render() {
		return (
			<div style={{ ...rowStyle, fontWeight: 'bold' }}>
				{
					this.props.categories.map(category => {
						return (
							<div key={category.name} style={{...cellStyle, position: 'relative', cursor: 'pointer'}} onClick={() => this.props.onClick(category.key)}>
								{ 
									this.props.sorted.trait === category.key ? <span style={{ position: 'absolute', left: '5px' }}>{ this.props.sorted.asc ? '▼' : '▲' }</span> : null
								}
								<ItemCell value={category.name} />
							</div>
						)
					})
				}
			</div>
		)
	}
}