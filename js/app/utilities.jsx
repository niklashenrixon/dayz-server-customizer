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

class SearchBox extends React.Component {
	render() {
		return (
			<div>
				<input placeholder="Search" onChange={this.props.onSearch} />
			</div>
		)
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
						this.props.categories.map(cat => <option value={cat} key={cat}>{cat}</option>) 
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

class SaveButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {}
		}

		this.onMouseDown = this.onMouseDown.bind(this)
	}

	onMouseDown() {
		console.log('Sending payload to server ╰( ⁰ ਊ ⁰ )━☆ﾟ.*･｡ﾟ')
		this.setState({ data: this.props.onGenerateSerializedData() })
		window.requestAnimationFrame(() => this.ref.submit())
	}

	render() {
		return (<form style={{ marginLeft: 'auto' }} ref={ref => this.ref = ref} method="post" action="engine.php">
		    <input type="hidden" name="data" value={this.state.data} />
		    <Button label="Save" onMouseUp={this.onMouseDown} />
		</form>)
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
					<Stepper type={TYPES.PRIORITY} label='Priority' onClick={this.props.onApplyMultiplier} />
					<Stepper type={TYPES.RESTOCK} label='Restock Timer' onClick={this.props.onApplyMultiplier} />
					<Stepper type={TYPES.LIFETIME} label='Lifetime Timer' onClick={this.props.onApplyMultiplier} />
				</div>
					<SearchBox onSearch={this.props.onSearch} />
					<div style={{ display: 'flex', flexDirection: 'row', paddingTop: '15px' }}>
						<Button onClick={this.props.onReset} label="Reset" />
						<Button onClick={this.props.onSyncMaxToMin} label="Sync Max to Min" />
						<SaveButton onGenerateSerializedData={this.props.onGenerateSerializedData}/>
					</div>
				</div>		
			</div>
		)	
	}
}