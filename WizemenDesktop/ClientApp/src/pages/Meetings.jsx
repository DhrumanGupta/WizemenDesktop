import React, {useEffect, useState} from 'react';
import styles from '../stylesheets/Meetings.module.scss';
import {Link} from "react-router-dom";
import axios from "axios";

function Meetings() {
	const [meetingData, setMeetingData] = useState({loading: true, meetings: undefined, error: false});

	useEffect(() => {
		
		axios
			.get('/user/meetings')
			.then(resp => {
				setMeetingData({
					loading: false,
					meetings: resp.data,
					error: false
				})
			})
			.catch(() => {
				setMeetingData({
					loading: false,
					meetings: undefined,
					error: true
				})
			})
		
	}, []);
	
	
	if (meetingData.loading) {
		return (
			<div className={`${styles.container} ${styles.centerContainer}`}>
				<h1>Loading Meetings...</h1>
			</div>
		)
	}

	if (meetingData.error) {
		return (
			<div className={`${styles.container} ${styles.centerContainer}`}>
				<h1>There was an error loading your meetings!</h1>
				<p>Please report the error <Link to={'#'} className={"text-header"} onClick={() => {
					window.electron.ipcRenderer.send('open-link', 'https://github.com/DhrumanGupta/WizemenDesktop/issues/new/choose')
				}}>here</Link></p>
			</div>
		)
	}
	
	console.log(meetingData.meetings)

	return (
		<div className={styles.container}>

		</div>
	);
}

export default Meetings;