import React, {useEffect, useState} from 'react';
import listStyles from '../stylesheets/Lists.common.module.scss';
import styles from '../stylesheets/Meetings.module.scss';
import {Link} from "react-router-dom";
import axios from "axios";
import {FiArrowRight} from "react-icons/fi";

function pad(input, length, padding) {
	while ((input = input.toString()).length + (padding = padding.toString()).length < length) {
		padding += padding;
	}
	return padding.substr(0, length - input.length) + input;
}

const meetingDate = (startDate, duration) => {
	const endDate = new Date(startDate.getTime() + duration * 60000)
	const monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	const start = `${startDate.getDate()} ${monthNames[startDate.getMonth()]}, ${(pad(startDate.getHours(), 2, 0))}:${pad(startDate.getMinutes(), 2, 0)}`;
	return `${start}-${(pad(endDate.getHours(), 2, 0))}:${pad(endDate.getMinutes(), 2, 0)}`;
}

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
			{
				meetingData.meetings.map((meeting, idx) => {
					
					const meetingTime = new Date(meeting.startTime);
					const diffMinutes = (new Date() - meetingTime) / 60000;
					const isCurrMeeting = diffMinutes < meeting.duration - 5 && diffMinutes >= -5;
					
					return (
						<Link to={'#'} key={idx} className={`${styles.meetingContainer} text-header ${isCurrMeeting && styles.active}`} onClick={() => {
							window.electron.ipcRenderer.send('open-link', meeting.joinUrl)
						}}>
							<span>
								<p className={`text-header ${listStyles.header}`}>{meeting.topic}</p>
								<p>{meeting.host}</p>
								<p>{meetingDate(meetingTime, meeting.duration)}</p>
								<p>{meeting.agenda}</p>
							</span>
							{
								isCurrMeeting && <p className={`${styles.indicator} text-header`}>Current Meeting</p>
							}
							<span>
								<p>Launch Meeting</p>
								<FiArrowRight/>
							</span>
							{/*{JSON.stringify(meeting)}*/}
						</Link>
					);
				})
			}
		</div>
	);
}

export default Meetings;