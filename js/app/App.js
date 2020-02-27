'use strict'
import React from 'react'
import { TYPES, DEBUG_MODE } from './constants'
import Utilities from './components/utilities/utilities'
import HeaderRow from './components/HeaderRow'
import ItemRow, { SkeletonRow } from './components/ItemRow'
import VisibilitySensor from 'react-visibility-sensor'

const containerStyle = {
    boxShadow: '0px 2px 4px rgba(0,0,0,0.3)',
    background: '#212529',
    width: '100%',
    borderRadius: '5px',
}

const tableStyle = {
    borderCollapse: 'collapse',
	display: 'table',
	...containerStyle
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

export default class App extends React.Component {

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
							}, []).sort((a, b) => sorter(sorted.trait, sorted.asc)(a, b)).map(item => 
								<VisibilitySensor partialVisibility>
									{
										({ isVisible }) => isVisible ? <ItemRow {...item} /> : <SkeletonRow value={item.name} />
									}
								</VisibilitySensor>)
						}
					
				</div>
			</div>	
		)
	}
}

/*
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
						}, []).sort((a, b) => sorter(sorted.trait, sorted.asc)(a, b)).map(item => 
							<VisibilitySensor partialVisibility>
								{
									({ isVisible }) => isVisible ? <ItemRow {...item} /> : <SkeletonRow value={item.name} />
								}
							</VisibilitySensor>)
*/