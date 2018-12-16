'use strict'
console.log('Hello!');
const DEBUG_MODE = true 

const TYPES = {
	MAX: 'nominal',
	MIN: 'min',
	COST: 'cost',
	RESTOCK: 'restock',
	LIFETIME: 'lifetime'
}

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
	borderRadius: '5px'
}

const inputStyle = {
	background: '#33383e',
	border: 'none',
	paddingLeft: '10px',
	paddingRight: '10px',
	maxWidth: '150px',
	width: '100%'
}

const utilitiesStyle = {
	display: 'flex',
	flexDirection: 'column',
	background: '#212529',
	width: '100%',
	marginBottom: '20px',
	borderRadius: '5px',
	padding: '15px'
}

const inputCharStyle = {
	position: 'absolute',
	top: '0px',
	right: '10px',
    color: 'black'
}

class SearchBox extends React.Component {
	render() {
		return (
			<div>
				<input placeholder="Search" onChange={this.props.onSearch} />
			</div>
		)
	}
}

class NumberInput extends React.Component { 
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this)
	}

	onChange(e) {
		const { value } = e.target 
		if (/^\d+$/.test(value) || value === '') {
			if (this.props.max && value > this.props.max) { 
				this.props.onChange(this.props.max) 
			} else {
				this.props.onChange(value)
			}
		}
	}

	render() {
		const { value, placeholder, character,  ...restProps } = this.props
		return (
			<div style={{ position: 'relative' }}>
				<input  
					{...restProps} 
					style={inputStyle}
					type="number" 
					value={character === 'm' ? Math.round(this.props.value / 60) : this.props.value}
					onChange={this.onChange}
					placeholder={this.props.placeholder}
				/>
				{
					character ? <div style={inputCharStyle}>{character}</div> : null
				}
			</div>
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

	componentWillReceiveProps({ value }) {
		this.setState({ value })
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
		const { value, onChange = false, ...restProps } = this.props 

		return <div style={cellStyle}>{
			value !== null && onChange ? <NumberInput {...restProps} onBlur={this.onBlur} value={this.state.value} onChange={this.onChange} /> : value
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
			<ItemCell onChange={ (value) => onChange(TYPES.MAX, value) } value={nominal} />
			<ItemCell onChange={ (value) => onChange(TYPES.MIN, value) } value={min} />
			<ItemCell onChange={ (value) => onChange(TYPES.COST, value) } character="%" max={100} value={cost} />
			<ItemCell onChange={ (value) => onChange(TYPES.RESTOCK, value) } character="m" value={restock} />
			<ItemCell onChange={ (value) => onChange(TYPES.LIFETIME, value) } character="m" value={lifetime} />
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
					<Stepper type={TYPES.MAX} label='Maximum' onClick={this.props.onApplyMultiplier} />
					<Stepper type={TYPES.MIN} label='Minimum' onClick={this.props.onApplyMultiplier} />
					<Stepper type={TYPES.COST} label='Priority' onClick={this.props.onApplyMultiplier} />
					<Stepper type={TYPES.RESTOCK} label='Restock Timer' onClick={this.props.onApplyMultiplier} />
					<Stepper type={TYPES.LIFETIME} label='Lifetime Timer' onClick={this.props.onApplyMultiplier} />
				</div>
					<SearchBox onSearch={this.props.onSearch} />
					<button onClick={this.props.onReset}>Reset</button>
					<button onClick={this.props.onSyncMaxToMin}>Sync Max to Min</button>
					<SaveButton onGenerateSerializedData={this.props.onGenerateSerializedData}/>
				</div>		
			</div>
		)	
	}
}

class SaveButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}

	render() {
		return (<form method="post" onMouseDown={() => this.setState({ data: this.props.onGenerateSerializedData() })} action="engine.php">
		    <input type="hidden" name="data" value={this.state.data} />
		    <input type="submit" value="Save" />
		</form>)
	}
}

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = { 
			sorted: false,
			categories: [],
			data: null,
			filter: 'false',
			searchString: ''
		} 
		this.handleValueChange = this.handleValueChange.bind(this)
		this.onChangeCategory = this.onChangeCategory.bind(this)
		this.onApplyMultiplier = this.onApplyMultiplier.bind(this)
		this.applyToEligibleItems = this.applyToEligibleItems.bind(this)
		this.onSyncMaxToMin = this.onSyncMaxToMin.bind(this)
		this.generateSerializedData = this.generateSerializedData.bind(this)
		this.loadData = this.loadData.bind(this)
		this.onSearch = this.onSearch.bind(this)
	}

	componentDidMount() {
		window.addEventListener('receiveData', () => {
			this.loadData()
		})
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

	sendData() {
		const data = JSON.stringify(this.state.data)
		console.log('Sending payload to server ╰( ⁰ ਊ ⁰ )━☆ﾟ.*･｡ﾟ')
	}

	generateSerializedData() {
		return JSON.stringify(this.state.data)
	}

	applyToEligibleItems(func, type) {
		const { data, filter, searchString } = this.state

		const newData = data
			.map((item, idx) => { 
				 if ((filter === 'false' || item.category === filter) && item.name.toLowerCase().search(searchString.toLowerCase()) > -1 && item[type] !== null) {
				 	item = func(item, idx)
 					if (type === TYPES.MIN && item[TYPES.MIN] > item[TYPES.MAX]) {
						item[TYPES.MAX] = item[TYPES.MIN]
					} else if (type === TYPES.MAX && item[TYPES.MAX] < item[TYPES.MIN]) {
						item[TYPES.MIN] = item[TYPES.MAX]
					}
				 }
				return item
			})

		this.setState({
			data: newData
		})
	}

	onApplyMultiplier(type, multiplier) {
		const modifier = item => {
		 	if (multiplier < 0) {
		 		item[type] = Math.trunc(item[type] / Math.abs(multiplier))
		 	} else {
		 		item[type] = Math.trunc(item[type] * multiplier) 
		 	}
		 	if (type === TYPES.COST && item[TYPES.COST] > 100) { item[TYPES.COST] = 100 }
		 	return item
		}

		this.applyToEligibleItems(modifier, type)
	}

	onSyncMaxToMin() {
		const modifier = item => {
		 	item[TYPES.MIN] = item[TYPES.MAX]
		 	return item
		}

		this.applyToEligibleItems(modifier, true)
	}

	handleValueChange(idx, type, value) {

		const modifier = (item, innerIdx) => {
			if (idx === innerIdx) {
				item[type] = value
			} 
			return item
		}
		this.applyToEligibleItems(modifier, type)
	}

	onChangeCategory(e) {
		this.setState({ filter: e.target.value })
	}

	onSearch(e) {
		this.setState({ searchString: e.target.value })
	}

	render() {
		const { data, categories, filter, searchString } = this.state;
		if (data === null) { return null }
		return (
			<div style={{ padding: '15px 40px' }}>
				<Utilities 
					categories={categories}
					onChangeCategory={this.onChangeCategory}
					onApplyMultiplier={this.onApplyMultiplier}
					onReset={this.loadData}
					onSyncMaxToMin={this.onSyncMaxToMin}
					onGenerateSerializedData={this.generateSerializedData}
					onSearch={this.onSearch}
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
							if ((filter === 'false' || item.category === filter) && item.name.toLowerCase().search(searchString.toLowerCase()) > -1) {
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