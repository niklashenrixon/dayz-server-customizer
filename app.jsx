'use strict'
console.log('Hello!');

const ArrowUp = () => (
	<svg 
	    width="100%"
	    height="100%"
	    xmlns="http://www.w3.org/2000/svg"
	    xmlnsXlink="http://www.w3.org/1999/xlink"
	    x="0px"
	    y="0px"
	    viewBox="0 0 254.296 254.296"
    >	
		<g>
			<g>
				<g>
					<path d="M249.628,176.101L138.421,52.88c-6.198-6.929-16.241-6.929-22.407,0l-0.381,0.636L4.648,176.101     c-6.198,6.897-6.198,18.052,0,24.981l0.191,0.159c2.892,3.305,6.865,5.371,11.346,5.371h221.937c4.577,0,8.613-2.161,11.41-5.594     l0.064,0.064C255.857,194.153,255.857,182.998,249.628,176.101z" fill="#FFFFFF"/>
				</g>
			</g>
		</g>
	</svg>
)	

const ArrowDown = () => (<div style={{ transform: 'rotate(-180deg)'}}><ArrowUp /></div>)

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

const utilitiesStyle = {
	display: 'flex',
	flexDirection: 'column',
	background: '#212529',
	width: '100%'
}


class NumberInput extends React.Component { 
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this)
	}

	onChange(e) {
		const { value } = e.target 
		if (/^\d+$/.test(value) || value === '') {
			this.props.onChange(value)
		}
	}


	render() {
		const { value, placeholder, ...restProps } = this.props
		return (
			<input  
				{...restProps} 
				style={inputStyle}
				type="text" 
				value={this.props.value}
				onChange={this.onChange}
				placeholder={this.props.placeholder}
			/>
		)
	}
}


class ItemCell extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			value: this.props.value
		}
		this.onChange = this.onChange.bind(this)
		this.onBlur = this.onBlur.bind(this)
	}

	onChange(value) {
		this.setState({ value })
	}

	onBlur() {
		if (this.state.value !== this.props.value) {
			this.props.onChange(this.state.value)
		}
	}

	render() {
		const { value, onChange = false } = this.props 

		return <div style={cellStyle}>{
			value !== undefined && onChange ? <NumberInput onBlur={this.onBlur} value={this.state.value} onChange={this.onChange} /> : value
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
		const { name, nominal, min, restock, cost, category, lifetime, onChange  } = this.props;

		return <div style={{ ...rowStyle }}>
			<ItemCell value={name} />
			<ItemCell onChange={ (value) => onChange('nominal', value) } value={nominal} />
			<ItemCell onChange={ (value) => onChange('min', value) } value={min} />
			<ItemCell onChange={ (value) => onChange('cost', value) } value={cost} />
			<ItemCell onChange={ (value) => onChange('restock', value) } value={restock} />
			<ItemCell onChange={ (value) => onChange('lifetime', value) } value={lifetime} />
			<ItemCell value={category} />
		</div>
	}
}

class CategoryFilter extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<select onChange={this.props.onChange}>
					<option value={false}>All</option>
					{ 
						this.props.categories.map(cat => (<option value={cat} key={cat}>{cat}</option>)) 
					}
				</select>
			</div>
		)
	}
}

class DropDown extends React.Component {
	render() {
		return (
			<div>
				<select onChange={(e) => this.props.onChange(e.target.value)}>
					<option value={false}>All</option>
					{ 
						this.props.options.map(value => (<option value={value} key={value}>{value}</option>)) 
					}
				</select>
			</div>
		)
	}
}

class Stepper extends React.Component {
	render() {
		return (
			<div>
				{ this.props.label }
				<div onClick={() => this.props.onClick(this.props.type, 2)} style={{ width: '18px'}}><ArrowUp /></div>
				<span>100%</span>
				<div onClick={() => this.props.onClick(this.props.type, -2)} style={{ width: '18px'}}><ArrowDown /></div>
			</div>
		)
	}
}

class Utilities extends React.Component {
	constructor(props) {
		super(props)
		this.state = { maximum: 0, minimum: 0, restock: 0, priority: 0, }
	}

	render() {
		return (
			<div style={utilitiesStyle}>
				<h1>Utilities</h1>
				
				<div>
					Filter by category<CategoryFilter categories={this.props.categories} onChange={this.props.onChangeCategory} />
					<div style={{ display: 'flex', justifyContent: 'space-between' }} >
					<Stepper type='nominal' label='Maximum' onClick={this.props.onApplyMultiplier} />
					<Stepper type='min' label='Minimum' onClick={this.props.onApplyMultiplier} />
					<Stepper type='cost' label='Priority' onClick={this.props.onApplyMultiplier} />
					<Stepper type='restock' label='Restock Timer' onClick={this.props.onApplyMultiplier} />
					<Stepper type='lifetime' label='Lifetime Timer' onClick={this.props.onApplyMultiplier} />
					</div>
					
					<button onClick={this.props.onReset}>Reset</button>
				</div>		
			</div>
		)	
	}
}

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = { 
			sorted: false,
			categories: [],
			data: null,
			filter: 'weapons'
		} 
		this.handleValueChange = this.handleValueChange.bind(this)
		this.onChangeCategory = this.onChangeCategory.bind(this)
		this.onApplyMultiplier = this.onApplyMultiplier.bind(this)
		this.loadData = this.loadData.bind(this)
	}

	loadData() {
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

	componentDidMount() {
		this.loadData()
	}

	onApplyMultiplier(type, multiplier) {
		console.log('onApplyMultiplier', type, multiplier)
		const { data, filter } = this.state
		const newData = data
			.map(item => { 
				 if (filter === 'false' || item.category === filter) {
				 	if (multiplier < 0) {
				 		item[type] = Math.trunc(item[type] / Math.abs(multiplier))
				 	} else {
				 		item[type] = Math.trunc(item[type] * multiplier) 
				 	}
				 }
				return item
			})

		this.setState({
			data: newData
		})
	}

	handleValueChange(idx, type, value) {
		const newState = [...this.state.data]
		newState[idx][type] = value
		this.setState({ data: newState })
	}


	onChangeCategory(e) {
		this.setState({ filter: e.target.value })
	}

	render() {
		const { data, categories, filter } = this.state;
		if (data === null) { return null }
		return (
			<div style={{ padding: '40px' }}>
				<Utilities 
					categories={categories}
					onChangeCategory={this.onChangeCategory}
					onApplyMultiplier={this.onApplyMultiplier}
					onReset={this.loadData}
				/>
				<div style={tableStyle}>

					<div style={{ ...rowStyle, fontWeight: 'bold' }}>
						<ItemCell value='Name' />
						<ItemCell value='Maximum' />
						<ItemCell value='Minimum' />
						<ItemCell value='Priority' />
						<ItemCell value='Restock timer' />
						<ItemCell value='Lifetime timer' />
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