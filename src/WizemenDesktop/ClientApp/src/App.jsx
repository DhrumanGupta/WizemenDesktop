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
import {SettingsProvider} from "./components/contexts/settingsContext";

const setStyles = (dark, fontSize) => {
	const root = document.querySelector(":root")
	document.querySelector("html").style.setProperty('font-size', `${fontSize}px`)

	const keys = Object.keys(colors);
	for (let i = 0; i < keys.length; i++) {
		const currKey = keys[i];
		const val = dark ? colors[currKey].dark : colors[currKey].light;
		root.style.setProperty(`--${currKey}`, val)
	}
}

const existingAutoLaunches = []
const autoLaunchMeetings = (meetings, shouldLaunch) => {
	if (shouldLaunch) {
		existingAutoLaunches.forEach((meetingToLaunch, index) => {
			if (!meetings.find(meetingFromWizemen => meetingFromWizemen.url === meetingToLaunch.url)) {
				// meeting is not returned by wizemen anymore
				clearTimeout(meetingToLaunch.timeout);
				existingAutoLaunches.splice(index, 1)
			}
		})
		
		
		const currTime = new Date().getTime();

		for (let i = 0; i < meetings.length; i++) {
			const currMeeting = meetings[i]
			const msDiff = new Date(currMeeting.startTime).getTime() - currTime
			if (msDiff < 0) continue;
			if (existingAutoLaunches.find(x => x.joinUrl === currMeeting.joinUrl)) continue;

			existingAutoLaunches.push({
				joinUrl: currMeeting.joinUrl,
				timeout: setTimeout(() => {
					window.electron.ipcRenderer.send('open-link', currMeeting.joinUrl)
					window.electron.ipcRenderer.send('notification', {
						title: `Meeting launched`,
						content: `Meeting: ${currMeeting.topic} was automatically launched`
					})
					
				}, msDiff)
			})
		}
	} else {
		for (let i = 0; i < existingAutoLaunches.length; i++) {
			clearTimeout(existingAutoLaunches[i].timeout)
			existingAutoLaunches.splice(0, existingAutoLaunches.length)
		}
	}
}

const existingNotifications = []
const notifyMeetings = (meetings, shouldNotify) => {
	if (shouldNotify) {
		existingNotifications.forEach((meetingToLaunch, index) => {
			if (!meetings.find(meetingFromWizemen => meetingFromWizemen.url === meetingToLaunch.url)) {
				// meeting is not returned by wizemen anymore
				clearTimeout(meetingToLaunch.timeout);
				existingNotifications.splice(index, 1)
			}
		})
		
		const currTime = new Date().getTime();

		for (let i = 0; i < meetings.length; i++) {
			const currMeeting = meetings[i]
			const msDiff = new Date(currMeeting.startTime).getTime() - currTime
			const sendBeforeMs = 300000; // 300000 == 5min
			
			if (msDiff < sendBeforeMs) continue;
			if (existingNotifications.find(x => x.joinUrl === currMeeting.joinUrl)) continue;

			existingNotifications.push({
				joinUrl: currMeeting.joinUrl,
				timeout: setTimeout(() => {
					window.electron.ipcRenderer.send('notification', {
						title: currMeeting.topic,
						content: `Meeting for ${currMeeting.topic} starts in 5 minutes!`,
						link: currMeeting.joinUrl
					})
				}, msDiff - sendBeforeMs)
			})
		}
	} else {
		for (let i = 0; i < existingNotifications.length; i++) {
			clearTimeout(existingNotifications[i].timeout)
		}
		existingNotifications.splice(0, existingNotifications.length)
	}
}

export default function App() {
	const [loggedIn, setLoggedIn] = useState(undefined);
	const [settings, setSettings] = useState(undefined);
	const [meetings, setMeetings] = useState([]);

	useEffect(() => {
		axios
			.get('/user/loggedIn')
			.then(resp => {
				setLoggedIn(resp.data);
			})
			.catch(() => {
			})
		
		let identifier;
		const fetchData = () => {
			axios
				.get('/user/meetings')
				.then(resp => {
					setMeetings(resp.data)
				})
				.catch(() => {
				})
			
			identifier = setTimeout(fetchData, 600000)
		}
		
		fetchData()
		
		axios
			.get('/user/settings')
			.then(resp => {
				setSettings(resp.data)
			})
			.catch(() => {
			})

		return () => {
			if (identifier) {
				clearTimeout(identifier)
			}
		}

	}, []);

	if (settings) {
		setStyles(settings.dark, settings.fontSize)
		autoLaunchMeetings(meetings, settings.autoLaunchMeetings)
		notifyMeetings(meetings, settings.notifyMeetings)
	}

	const updateThenSetSettings = (settings) => {
		axios
			.post('/user/settings', settings)
			.then(() => {
				setSettings(settings)
			})
			.catch(() => {
			})
	}

	let content;

	if (loggedIn === false) {
		content = <Login setLoggedIn={setLoggedIn}/>;
	} else if (loggedIn === true) {
		content = (
			<Layout>
				<Route exact path={'/'} component={Landing}/>

				{Routes.map(route =>
					<Route key={route.path} exact={!route.notAppExact} path={route.path} component={route.page}/>
				)}

				<Route exact path={'/classes/:id'} component={Class}/>

				<Route component={NotFound}/>
			</Layout>
		)
	} else {
		content = <div className={"message-container"}>
			<h1 className={"text-header text-center"}>Loading..</h1>
		</div>
	}

	return (
		<React.Fragment>
			<Header/>
			<SettingsProvider value={{settings, updateThenSetSettings}}>
				{content}
			</SettingsProvider>
		</React.Fragment>
	);
}