import React from 'react'
import Stepper from './Stepper'
import CategoryFilter from './CategoryFilter'
import SearchBox from './SearchBox'
import Button from './Button'
import SaveButton from './SaveButton'
import { TYPES } from '../../constants'


const containerStyle = {
    boxShadow: '0px 2px 4px rgba(0,0,0,0.3)',
    background: '#212529',
    width: '100%',
    borderRadius: '5px',
}

const utilitiesStyle = {
	display: 'flex',
	flexDirection: 'column',
	marginBottom: '20px',
	padding: '15px',
	...containerStyle
}

export default class Utilities extends React.Component {
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
