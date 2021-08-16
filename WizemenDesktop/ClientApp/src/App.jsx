import Layout from "./components/Layout";
import {Route} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from 'axios';
import Login from "./pages/Login";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import {Routes} from "./data/RoutesData";

export default function App() {
	const [loggedIn, setLoggedIn] = useState(undefined);

	useEffect(() => {
		axios.get('/user/loggedIn')
			.then(resp => {
				setLoggedIn(resp.data);
			})
	}, []);

	let content;

	if (loggedIn === false) {
		content = <Login setLoggedIn={setLoggedIn}/>;
	} else if (loggedIn === true) {
		content = (
			<Layout>
				<Route exact path={'/'} component={Landing}/>

				{
					Routes.map(route => {
						return (
							<Route key={route.path} exact path={route.path} component={route.page}/>
						)
					})
				}

				<Route component={NotFound}/>
			</Layout>
		)
	} else {
		content = <div>
			<br/>
			<br/>
			<br/>
			<h1 className={"text-header text-center"}>Loading..</h1>
		</div>
	}

	return (
		<React.Fragment>
			<Header/>
			{content}
		</React.Fragment>
	);
}