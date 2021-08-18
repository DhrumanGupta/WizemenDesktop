import React from 'react';
import {Link} from "react-router-dom";

function NotFound() {
	return (
		<div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexGrow: 1}}>
			<h1 className={"text-header text-center"}>
				Not found
			</h1>
			<Link to={'/'} className={"text-header"}>Go Home</Link>
		</div>
	);
}

export default NotFound;