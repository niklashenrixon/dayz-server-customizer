const containerStyle = {
    boxShadow: '0px 2px 4px rgba(0,0,0,0.3)',
    background: '#212529',
    width: '100%',
    borderRadius: '5px',
}


const rowStyle = {
    display: 'table-row',
    lineHeight: '35px',
    borderBottom: '1px solid rgb(29, 29, 29)'
}

const cellStyle = {
	display: 'table-cell',
	paddingLeft: '15px',
	maxWidth: '150px'
}

const tableStyle = {
    borderCollapse: 'collapse',
	display: 'table',
	marginBottom: '50px',
	...containerStyle
}

const inputStyle = {
	background: '#33383e',
	border: 'none',
	paddingLeft: '10px',
	paddingRight: '10px',
	width: '100%'
}

const utilitiesStyle = {
	display: 'flex',
	flexDirection: 'column',
	marginBottom: '20px',
	padding: '15px',
	...containerStyle
}

const inputCharStyle = {
	position: 'absolute',
	top: '0px',
	right: '10px',
    color: 'black'
}

