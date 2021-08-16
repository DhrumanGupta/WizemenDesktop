import React, {useEffect, useState} from 'react';
import listStyles from '../stylesheets/Lists.common.module.scss';
import {Link} from "react-router-dom";
import axios from "axios";

function Meetings() {
	let source = axios.CancelToken.source();
	const [meetingData, setMeetingData] = useState({loading: true, meetings: undefined, error: false});

	let unmounted = false;
	const setData = (obj) => {
		if (!unmounted) {
			setMeetingData(obj)
		}
	}

	useEffect(() => {
		axios
			.get('/user/meetings')
			.then(resp => {
				setData({
					loading: false,
					meetings: resp.data,
					error: false
				})
			})
			.catch(() => {
				setData({
					loading: false,
					meetings: undefined,
					error: true
				})
			})

		return (() => {
			if (source) {
				unmounted = true;
				source.cancel("Landing Component got unmounted");
			}
		});
	}, []);


	if (meetingData.loading) {
		return (
			<div className={"message-container"}>
				<h1>Loading Meetings...</h1>
			</div>
		)
	}

	if (meetingData.error) {
		return (
			<div className={"message-container"}>
				<h1>There was an error loading your meetings!</h1>
				<p>Please report the error <Link to={'#'} className={"text-header"} onClick={() => {
					window.electron.ipcRenderer.send('open-link', 'https://github.com/DhrumanGupta/WizemenDesktop/issues/new/choose')
				}}>here</Link> (It helps out a lot, and all reports are greatly appreciated!)</p>
			</div>
		)
	}

	return (
		<div className={listStyles.container}>

		</div>
	);
}

export default Meetings;