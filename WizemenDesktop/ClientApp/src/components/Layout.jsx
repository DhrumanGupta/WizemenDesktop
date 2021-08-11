import React from 'react';
import {Switch} from 'react-router-dom';
import Sidebar from "./Sidebar";

function Layout(props) {
	return (
		<Switch>
			<Sidebar/>
			<main>
				<div className={"container"}>
					{props.children}
				</div>
			</main>
		</Switch>
	);
}

export default Layout;