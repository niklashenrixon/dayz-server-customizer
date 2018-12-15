'use strict'
console.log('Hello!');

const rowStyle = {
    display: 'table-row'
}

const columnStyle = {
	display: 'table-cell',
}

class ItemColumn extends React.Component {
	render() {
		return <div style={columnStyle}>{this.props.value}</div>
	}
}

class ItemRow extends React.Component {
	render() {
		const { name, nominal, min, restock, cost, category } = this.props;

		return <div style={rowStyle}>
			<ItemColumn value={name} />
			<ItemColumn value={min} />
			<ItemColumn value={restock} />
			<ItemColumn value={cost} />
			<ItemColumn value={category} />
		</div>
	}
}

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			sorted: false
		} // I care a lot about browser performance
		
		this.filterBy = this.filterBy.bind(this)
	}

	componentDidMount() {
		const categories = []

		const data = Object.keys(window.XMLData).map(name => {
			
			return ({ name, ...window.XMLData[name] })
		}),
		this.setState({
			data: 
		})
	}

	filterBy(type) {
		const { sorted, data } = this.state;

		const sortedData = data.sort((a, b) => {
			const typeA = a[type]
			const typeB = b[type]

		    if(!typeA) return sorted ? 1 : -1;
		    if(!typeB) return sorted ? -1 : 1;
		    if(typeA === typeB) return 0;

		    if (this.state.sorted) {
				typeB.localeCompare(typeA)
		    } else {
		    	return typeA.localeCompare(typeB)
		    }
		})

		this.setState({ 
			data: sortedData,
			sorted: !this.state.sorted
		})
	}

	render() {
		return (
			<div style={{ display: 'table', width: '100%' }}>
				All fancy things
				{ 
					this.state.data ? this.state.data.map(item => <ItemRow key={item.name} {...item} />) : null 
				}
			</div>
		)
	}
}

const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(App), domContainer);