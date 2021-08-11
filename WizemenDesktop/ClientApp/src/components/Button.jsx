import React from 'react';

function Button(props) {

	const handleClick = () => {
		if (props.handleClick) {
			props.handleClick();
		}
	}

	return (
		<button className={`${props.className ? props.className : ""} button-main`}
		        type={props.type ? props.type : "submit"} onClick={handleClick}>
			{props.children}
		</button>
	);
}

export default Button;