import Layout from "./components/Layout";
import {Route} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from 'axios';
import Login from "./pages/Login";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import {Routes} from "./data/RoutesData";
import Class from "./pages/Class";
import {colors} from './data/Theme';

const setStyles = ({dark, fontSize}) => {
	const root = document.querySelector(":root")
	document.querySelector("html").style.setProperty('font-size', `${fontSize}px`)

	const keys = Object.keys(colors);
	for (let i = 0; i < keys.length; i++) {
		const currKey = keys[i];
		root.style.setProperty(`--${currKey}`, dark ? colors[currKey].dark : colors[currKey].light)
	}
}

export default function App() {
	const [loggedIn, setLoggedIn] = useState(undefined);
	const [settings, setSettings] = useState(undefined);

	useEffect(() => {
		axios
			.get('/user/loggedIn')
			.then(resp => {
				setLoggedIn(resp.data);
			})
			.catch(() => {
			})

		axios
			.get('/user/settings')
			.then(resp => {
				setSettings(resp.data)
			})
			.catch(() => {
			})
	}, []);

	if (settings) {
		setStyles(settings)
	}

	let content;

	if (loggedIn === false) {
		content = <Login setLoggedIn={setLoggedIn}/>;
	} else if (loggedIn === true) {
		content = (
			<Layout>
				<Route exact path={'/'} component={Landing}/>

				{Routes.map(route =>
					<Route key={route.path} exact path={route.path} component={route.page}/>
				)}

				<Route exact path={'/classes/:id'} component={Class}/>

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