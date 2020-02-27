import React from 'react'

export const ArrowUp = () => (
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

export const ArrowDown = () => (<div style={{ transform: 'rotate(-180deg)'}}><ArrowUp /></div>)
