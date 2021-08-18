import React, {useEffect, useState} from 'react';
import styles from "../stylesheets/Schedule.module.scss";
import axios from "axios";
import Card from "./Card";
import {between} from "../utils/Helpers";

function compareValues(key) {
	const order = 'asc';
	return function innerSort(a, b) {
		if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
			return 0;
		}

		const varA = (typeof a[key] === 'string')
			? a[key].toUpperCase() : a[key];
		const varB = (typeof b[key] === 'string')
			? b[key].toUpperCase() : b[key];

		let comparison = 0;
		if (varA > varB) {
			comparison = 1;
		} else if (varA < varB) {
			comparison = -1;
		}
		return (
			(order === 'desc') ? (comparison * -1) : comparison
		);
	};
}

// To be replaced with moment.js
const formatDate = (dateObj) => {
	const monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];
	const month = monthNames[dateObj.getMonth()];
	const day = String(dateObj.getDate()).padStart(2, '0');
	const year = dateObj.getFullYear();
	return `${month} ${day}, ${year}`;
}

function Schedule(props) {
	const [scheduleData, setScheduleData] = useState({loading: true, schedule: undefined, error: false});
	const [meetings, setMeetings] = useState([]);

	let source = axios.CancelToken.source();
	let unmounted = false;
	const setDataSchedule = (obj) => {
		if (!unmounted) {
			setScheduleData(obj)
		}
	}

	const setDataMeetings = (obj) => {
		if (!unmounted) {
			setMeetings(obj)
		}
	}

	useEffect(() => {
		axios
			.get('/user/schedule')
			.then(x => {
				setDataSchedule({
					loading: false,
					schedule: x.data,
					error: false
				})
			})
			.catch(e => {
				setDataSchedule({
					loading: false,
					schedule: [],
					error: true
				})
			})

		axios
			.get('/user/meetings')
			.then(x => {
				if (x.data.length > 0) {
					setDataMeetings(x.data)
				}
			})
			.catch(e => {
				setDataMeetings([])
			})

		return (() => {
			if (source) {
				unmounted = true;
				source.cancel("Landing Component got unmounted");
			}
		});
	}, []);

	if (scheduleData.loading) {
		return (
			<h3 className="text-header text-center">
				Loading...
			</h3>
		)
	}

	if (scheduleData.error) {
		return (
			<Card>
				<h3 className="text-header text-center">
					There was an error loading the schedule!
				</h3>
			</Card>
		)
	}

	const allTimes = []
	scheduleData.schedule.forEach(x => {
		const startTimeFormatted = x.startTime.substr(11, 5);
		if (allTimes.some(time => time.startTimeFormatted === startTimeFormatted)) {
			return; // continue for .forEach()
		}

		const obj = {
			startTime: x.startTime,
			startTimeFormatted: startTimeFormatted,
			endTimeFormatted: x.endTime.substr(11, 5)
		}
		obj.sortBy = obj.startTimeFormatted.replace(':', '')
		allTimes.push(obj)
	})

	allTimes.sort(compareValues('sortBy'));
	return (
		<Card>
			<h3 className={"text-center text-header"}>
				Week Schedule Starting {formatDate(new Date(scheduleData.schedule[0].startingDay))}
			</h3>
			<div className={styles.scheduleContainer} id="schedule_data">

				<div className="text-header text-center">Lesson</div>
				<div className="text-header text-center">Monday</div>
				<div className="text-header text-center">Tuesday</div>
				<div className="text-header text-center">Wednesday</div>
				<div className="text-header text-center">Thursday</div>
				<div className="text-header text-center">Friday</div>

				{
					allTimes.map((time, idx) => {
						const forCurrentTime = scheduleData.schedule.filter(x => x.startTime === time.startTime);
						const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

						return (
							<React.Fragment key={time.sortBy}>
								<div className={"text-header"}>
									<p>{idx + 1}</p>
									<p>{time.startTimeFormatted}-{time.endTimeFormatted}</p>
								</div>
								{
									weekdays.map(weekday => {
										const obj = forCurrentTime.find(x => x.day === weekday);
										const meeting = meetings.find(meeting => {
											const meetingTime = new Date(meeting.startTime);
											const currTime = new Date(obj?.startDate)
											return !!between(meetingTime.getTime(),
												currTime?.setHours(Number(time.startTimeFormatted.substr(0, 2))),
												new Date(currTime?.getTime() + meeting.duration * 60000));
										})

										return (
											<div key={weekday}>
												<p>
													{obj?.subject ? obj?.subject : "N/A"}
													{
														meeting && <React.Fragment>
															<br/>
															<a href={meeting?.joinUrl} target={"_blank"} rel="noreferrer"
															   className={styles.joinUrl}>Join ({meeting?.topic?.substr(0, 7)}..)</a>
														</React.Fragment>
													}
												</p>
											</div>
										)
									})
								}
							</React.Fragment>
						)
					})
				}

			</div>
		</Card>
	);
}

export default Schedule;