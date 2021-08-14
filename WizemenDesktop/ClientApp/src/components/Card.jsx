import React from 'react';

function Card(props) {
	return (
		<div className={`card ${props.className ? props.className : ''}`}>
			{props.children}
		</div>
	);
}

export default Card;