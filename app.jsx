'use strict'
console.log('Hello!');

const rowStyle = {
    display: 'table-row',
    background: '#212529',
    borderTop: '1px solid #32383e',
    lineHeight: '35px'
}

const cellStyle = {
	display: 'table-cell',
	paddingLeft: '15px'
}

const tableStyle = {
    borderCollapse: 'separate',
    borderSpacing:' 0 1px',
	display: 'table',
	width: '100%',
	padding: '20px'
}

const inputStyle = {
	background: '#33383e',
	border: 'none',
	paddingLeft: '10px',
	paddingRight: '10px',
	width: '80%'
}

class ItemCell extends React.Component {
	render() {
		const { value, onChange = false } = this.props 

		return <div style={cellStyle}>{
			value !== undefined && onChange ? <input style={inputStyle} onChange={(e) => onChange(e.target.value)} type="text" value={parseInt(value)} /> : value
		}</div>
	}
}

class ItemRow extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			...this.props 
		}
	}

	render() {
		const { name, nominal, min, restock, cost, category, onChange  } = this.props;

		return <div style={{ ...rowStyle }}>
			<ItemCell value={name} />
			<ItemCell onChange={ (value) => onChange('nominal', value) } value={nominal} />
			<ItemCell onChange={ (value) => onChange('min', value) } value={min} />
			<ItemCell onChange={ (value) => onChange('restock', value) } value={restock} />
			<ItemCell onChange={ (value) => onChange('cost', value) } value={cost} />
			<ItemCell value={category} />
		</div>
	}
}

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			sorted: false,
			categories: [],
			data: null,
			filter: 'weapons'
		} 
		this.handleValueChange = this.handleValueChange.bind(this)
		this.handleChangeCategory = this.handleChangeCategory.bind(this)
	}

	componentDidMount() {
		const categories = []

		const data = Object.keys(window.XMLData).map(name => { // This shows I care a lot about browser performance
			const item = { ...window.XMLData[name] }
			if (item.category && categories.indexOf(item.category) === -1) {
				categories.push(item.category)
			}
			return ({ name, ...item })
		})

		this.setState({
			data,
			categories
		})
	}

	handleValueChange(idx, type, value) {
		const newState = [...this.state.data]
		if (/^\d+$/.test(value)) {
			newState[idx][type] = value
			this.setState({ data: newState })
		} else if (value === '') {
			newState[idx][type] = 0
			this.setState({ data: newState })
		}
	}


	handleChangeCategory(e) {
		this.setState({ filter: e.target.value })
	}

	render() {
		const { data, categories, filter } = this.state;
		if (data === null) { return null }
		return (
			<div style={{ padding: '40px' }}>
				<div style={tableStyle}>
					Filter by category <select onChange={this.handleChangeCategory}>
						<option value={false}>All</option>
						{ 
							categories.map(cat => (<option value={cat} key={cat}>{cat}</option>)) 
						}
					</select>
					<div style={{ ...rowStyle, fontWeight: 'bold' }}>
						<ItemCell value='Name' />
						<ItemCell value='Maximum' />
						<ItemCell value='Minimum' />
						<ItemCell value='Restock timer' />
						<ItemCell value='Priority' />
						<ItemCell value='Category' />
					</div>
					{ 
						data.reduce((filtered, item, idx) => {
							if (filter === 'false' || item.category === filter) {
								filtered.push(
									<ItemRow
										onChange={(type, value) => this.handleValueChange(idx, type, value)}
										key={item.name}
										{...item}
									/>
								)
							}
							return filtered
						}, [])
					}
				</div>
			</div>	
		)
	}
}

const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(App), domContainer);