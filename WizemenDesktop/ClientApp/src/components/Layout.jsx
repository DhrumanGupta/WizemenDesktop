import React from 'react';
import Sidebar from "./Sidebar";
import {Switch} from "react-router-dom";

function Layout(props) {
	return (
		<React.Fragment>
			<Sidebar/>
			<main>
				<div className={"container"} style={{display: "flex"}}>
					<Switch>
						{props.children}
					</Switch>
				</div>
			</main>
		</React.Fragment>
	);
}

export default Layout;