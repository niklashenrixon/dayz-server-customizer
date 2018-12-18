'use strict'

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
					value={this.props.value}
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

class HeaderRow extends React.Component {
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

const categoryNames = [
	{
		name: 'Name',
		key: TYPES.NAME
	},
	{	
		name: 'Maximum',
		key: TYPES.MAX
	},
	{
		name: 'Minimum',
		key: TYPES.MIN
	},
	{
		name: 'Priority',
		key: TYPES.PRIORITY
	},
	{
		name: 'Restock timer',
		key: TYPES.RESTOCK
	},
	{
		name: 'Lifetime timer',
		key: TYPES.LIFETIME
	},
	{
		name: 'Category',
		key: TYPES.CATEGORY
	}
]

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

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = { 
			sorted: {trait: 'name', asc: true},
			categories: [],
			data: null,
			filter: 'false',
			searchString: '',
			fileType: undefined
		} 
		this.handleValueChange = this.handleValueChange.bind(this)
		this.onChangeCategory = this.onChangeCategory.bind(this)
		this.onApplyMultiplier = this.onApplyMultiplier.bind(this)
		this.applyChangeToEligibleItems = this.applyChangeToEligibleItems.bind(this)
		this.onSyncMaxToMin = this.onSyncMaxToMin.bind(this)
		this.generateSerializedData = this.generateSerializedData.bind(this)
		this.loadData = this.loadData.bind(this)
		this.onSearch = this.onSearch.bind(this)
		this.sortBy = this.sortBy.bind(this)
	}

	sortBy(traitKey) {
		let { sorted } = this.state
		if (sorted === null) {
			sorted = {
				trait: traitKey,
				asc: true
			}
		} else {
			if (sorted.trait === traitKey) {
				sorted.asc = !sorted.asc
			} else {
				sorted = {
					trait: traitKey,
					asc: true
				}
			}
		}

		this.setState({ sorted })
	}

	componentDidMount() {
		console.log('App up and running, awaiting input');
		window.addEventListener('receiveData', () => {
			this.loadData()
		})
	}

	loadData() {
		const categories = []
		const { data: serverData, fileType } = window.XMLData;

		const data = Object.keys(serverData).map(name => { // This shows I care a lot about browser performance
			const item = { ...serverData[name] }
			if (item.category && categories.indexOf(item.category) === -1) {
				categories.push(item.category)
			}
			return ({ name, ...item })
		})

		this.setState({
			data,
			categories,
			fileType
		})
	}

	generateSerializedData() {
		return JSON.stringify({ fileType: this.state.fileType, data: this.state.data})
	}

	applyChangeToEligibleItems(func, type) {
		const { data, filter, searchString } = this.state

		const newData = data
			.map((item, idx) => { 
				 if (
				 		(filter === 'false' || item.category === filter) && 
				 		item.name.toLowerCase().search(searchString.toLowerCase()) > -1 &&
				 		item[type] !== null
				 	) {
				 	item = func(item, idx)

				 	const max = parseInt(item[TYPES.MAX])
				 	const min = parseInt(item[TYPES.MIN])
				 	// Failsafe to make sure max and min don't pass each other
 					if (type === TYPES.MIN && min > max) {
						item[TYPES.MAX] = min
					} else if (type === TYPES.MAX && max < min) {
						item[TYPES.MIN] = max
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
		 	if (type === TYPES.PRIORITY && item[TYPES.PRIORITY] > 100) { item[TYPES.PRIORITY] = 100 }
		 	return item
		}

		this.applyChangeToEligibleItems(modifier, type)
	}

	onSyncMaxToMin() {
		const modifier = item => {
		 	item[TYPES.MIN] = item[TYPES.MAX]
		 	return item
		}

		this.applyChangeToEligibleItems(modifier, true)
	}

	handleValueChange(idx, type, value) {
		console.log('handleValueChange', idx, type, value);
		const modifier = (item, innerIdx) => {
			if (idx === innerIdx) {
				item[type] = value
			} 
			return item
		}
		this.applyChangeToEligibleItems(modifier, type)
		console.log('save data')
	}

	onChangeCategory(e) {
		this.setState({ filter: e.target.value })
	}

	onSearch(e) {
		this.setState({ searchString: e.target.value })
	}

	render() {
		const { data, categories, filter, searchString, sorted } = this.state;
		if (data === null) { return <h1 style={{ textAlign: 'center' }}>Drag & Drop config file to get started</h1> }
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
					<HeaderRow onClick={this.sortBy} sorted={sorted} categories={categoryNames}/>
					{ 
						data.reduce((filtered, item, idx) => {
							if ((filter === 'false' || item.category === filter) && item.name.toLowerCase().search(searchString.toLowerCase()) > -1) {
								filtered.push(
									{
										key: `${idx}_${item.name}`,
										onChange: (type, value) => this.handleValueChange(idx, type, value),
										...item
									}
								)
							}
							return filtered
						}, []).sort((a, b) => sorter(sorted.trait, sorted.asc)(a, b)).map(item => <ItemRow {...item} />)
					}
				</div>
			</div>	
		)
	}
}

const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(App), domContainer);
