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

class CategoryFilter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			focused: false,
			hovered: false
		}

		this.onMouseOver = this.onMouseOver.bind(this)
		this.onMouseOut = this.onMouseOut.bind(this)
		this.onBlur = this.onBlur.bind(this)
		this.onFocus = this.onFocus.bind(this)
	}

	onBlur() { this.setState({ focused: false }) }
	onFocus() { this.setState({ focused: true }) }
	onMouseOver() { this.setState({ hovered: true }) }
	onMouseOut() { this.setState({ hovered: false })}

	render() {
		const { focused, hovered } = this.state
		const bg = focused || hovered ? fieldColors.bg.active : fieldColors.bg.idle;
		const text = focused || hovered ? fieldColors.text.active : fieldColors.text.idle;
		const style = { fontSize: '13px', outline: 'none', padding: '0 10px', border: 'none', marginRight: '15px', cursor: 'pointer',  transition: 'background .3s linear', boxShadow: '0px 2px 4px rgba(0,0,0,0.3)', border: 'none', display: 'inline-block', borderRadius: '5px', background: bg, color: text, minWidth: '150px', height: '43px'  }

		return (
			<div>
				<select 
					onBlur={this.onBlur}
					onFocus={this.onFocus}
					onMouseOver={this.onMouseOver}
					onMouseOut={this.onMouseOut}
					onChange={this.props.onChange}
					style={style} 
					defaultValue='Filter'
				>
					<option value='Filter' disabled>Filter</option>
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
		const stepperStyle = {
			textAlign: 'center',
		    padding: '10px',
		    background: '#170c1382',
		    width: '100%',
		    maxWidth: '150px',
		    borderRadius: '10px',
		    fontSize: '13px'
		}
		const stepStyle = {
			margin: '0 auto', 
			width: '18px',
			cursor: 'pointer',
			opacity: '.6'
		}
		return (
			<div className='stepper' style={stepperStyle}>
				{ this.props.label }
				<div onClick={() => this.props.onClick(this.props.type, 2)} style={stepStyle}><ArrowUp /></div>
				<span>± 100%</span>
				<div onClick={() => this.props.onClick(this.props.type, -2)} style={stepStyle}><ArrowDown /></div>
			</div>
		)
	}
}

const fieldColors = {
	bg: {
		idle: '#170c14',
		active: 'rgb(37, 20, 28)'	
	},
	text: {
		idle: 'rgb(189, 183, 177)',
		active: 'rgb(255, 255, 255)'
	}
}

class SearchBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			focused: false,
			hovered: false
		}

		this.onKeyDown = this.onKeyDown.bind(this)
		this.onMouseOver = this.onMouseOver.bind(this)
		this.onMouseOut = this.onMouseOut.bind(this)
		this.onBlur = this.onBlur.bind(this)
		this.onFocus = this.onFocus.bind(this)
	}

	onKeyDown(e) {}
	onBlur() { this.setState({ focused: false }) }
	onFocus() { this.setState({ focused: true }) }
	onMouseOver() { this.setState({ hovered: true }) }
	onMouseOut() { this.setState({ hovered: false })}

	render() {
		const { focused, hovered } = this.state
		const bg = focused || hovered ? fieldColors.bg.active : fieldColors.bg.idle;
		const text = focused || hovered ? fieldColors.text.active : fieldColors.text.idle;
		return (
			<div style={{ display: 'inline-block'}}>
				<input
					placeholder="Search"
					onChange={this.props.onSearch}
					onMouseOver={this.onMouseOver}
					onMouseOut={this.onMouseOut}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					style={{ fontSize: '13px', outline: 'none',padding: '0 10px', border: 'none', marginRight: '15px', cursor: 'pointer',  transition: 'background .3s linear', boxShadow: '0px 2px 4px rgba(0,0,0,0.3)', border: 'none', display: 'inline-block', borderRadius: '5px', background: bg, color: text, minWidth: '150px', height: '43px'  }} />
			
			</div>
		)
	}
}

class Button extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			down: false
		}



		this.onMouseOver = this.onMouseOver.bind(this)
		this.onMouseOut = this.onMouseOut.bind(this)
	}

	onMouseOver() {
		this.setState({ down: true })
		if (this.props.onMouseOver) { this.props.onMouseOver() }
	}

	onMouseOut() {
		this.setState({ down: false })
		if (this.props.onMouseOut) { this.props.onMouseOut() }
	}

	render() {
		return (
			<div onClick={this.props.onClick} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} style={{ marginRight: '15px', cursor: 'pointer',  transition: 'background .3s linear', boxShadow: '0px 2px 4px rgba(0,0,0,0.3)', border: '1px solid "rgb(22, 24, 28)', display: 'inline-block', borderRadius: '5px', background: this.state.down ? fieldColors.bg.active : fieldColors.bg.idle, minWidth: '150px', height: '43px'  }}>
				<div style={{ transition: 'color .3s linear', color: this.state.down ? fieldColors.text.active : fieldColors.text.idle, fontFamily: 'Verdana',lineHeight: '44px', fontSize: '13px', textAlign: 'center' }}>
					{ this.props.label }
				</div>
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

		const footerSstyle = {
		  "display": "flex",
		  "flexDirection": "row",
		  "paddingTop": "15px",
		  "position": "fixed",
		  "bottom": "0px",
		  "left": "0",
		  "right": "0",
		  "background": "#060606",
		  "padding": "10px 25px 10px 40px",
		  "zIndex": "10000000000000000",
		  boxShadow: '-1px 0 5px rgba(0,0,0,0.5)'
		}

		return (
			<div style={utilitiesStyle}>
				<div>
					<div style={{"display":"flex","justifyContent":"space-between","paddingLeft":"16.2%","paddingRight":"13%"}} >
						<Stepper type={TYPES.MAX} label='Maximum' onClick={this.props.onApplyMultiplier} />
						<Stepper type={TYPES.MIN} label='Minimum' onClick={this.props.onApplyMultiplier} />
						<Stepper type={TYPES.PRIORITY} label='Priority' onClick={this.props.onApplyMultiplier} />
						<Stepper type={TYPES.RESTOCK} label='Restock Timer' onClick={this.props.onApplyMultiplier} />
						<Stepper type={TYPES.LIFETIME} label='Lifetime Timer' onClick={this.props.onApplyMultiplier} />
					</div>
					
					<div style={footerSstyle}>
						<CategoryFilter categories={this.props.categories} onChange={this.props.onChangeCategory} />
						<SearchBox onSearch={this.props.onSearch} />
						<Button onClick={this.props.onReset} label="Reset" />
						<Button onClick={this.props.onSyncMaxToMin} label="Sync Max to Min" />

						<SaveButton onGenerateSerializedData={this.props.onGenerateSerializedData}/>
					</div>
				</div>		
			</div>
		)	
	}
}

