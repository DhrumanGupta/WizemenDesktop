import Layout from "./components/Layout";
import Home from "./pages/Home";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from 'axios';
import Login from "./pages/Login";
import Header from "./components/Header";

export default function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		axios.get('/home/loggedIn')
			.then(resp => {
				setLoggedIn(resp.data);
			})
	}, []);

	return (
		<Router>
			<Header/>
			{
				loggedIn ?
					<Layout>
						<>
							<Route exact path={'/'} component={Home}/>
						</>
					</Layout>
					:
					<Login/>
			}
		</Router>
	);
}