import React from 'react'
import NumberInput from './NumberInput'

const cellStyle = {
	display: 'table-cell',
	paddingLeft: '15px',
	maxWidth: '150px'
}

export default class ItemCell extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			value: this.props.value
		}
		this.onChange = this.onChange.bind(this)
		this.onBlur = this.onBlur.bind(this)
	}

	componentWillReceiveProps({ value }) {
		this.setState({ value })
	}

	onChange(value) {
		this.setState({ value })
	}

	onBlur() {
		const { value } = this.state
		if (value !== this.props.value) {
			this.props.onChange(value)
		}
	}

	render() {
		const { value, onChange = false, ...restProps } = this.props 

		return <div style={{...cellStyle, ...this.props.style}}>
			<div style={{ maxWidth: '150px'}}>
				{
					value !== null && onChange ? <NumberInput {...restProps} onBlur={this.onBlur} value={this.state.value} onChange={this.onChange} /> : value
				}
			</div>
		</div>
	}
}