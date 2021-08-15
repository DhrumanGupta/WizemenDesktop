import React, {useEffect, useState} from 'react';
import styles from '../stylesheets/Meetings.module.scss';
import {Link} from "react-router-dom";
import axios from "axios";

export default function Classes() {
	const [classData, setClassData] = useState({loading: true, classes: undefined, error: false});

	useEffect(() => {
		axios
			.get('/user/classes')
			.then(resp => {
				setClassData({
					loading: false,
					classes: resp.data,
					error: false
				})
			})
			.catch(() => {
				setClassData({
					loading: false,
					classes: undefined,
					error: true
				})
			})

	}, []);


	if (classData.loading) {
		return (
			<div className={`${styles.container} ${styles.centerContainer}`}>
				<h1>Loading Classes...</h1>
			</div>
		)
	}

	if (classData.error) {
		return (
			<div className={`${styles.container} ${styles.centerContainer}`}>
				<h1>There was an error loading your meetings!</h1>
				<p>Please report the error
					<Link to={'#'} className={"text-header"} onClick={() => {
					window.electron.ipcRenderer.send('open-link', 'https://github.com/DhrumanGupta/WizemenDesktop/issues/new/choose')
				}}>here</Link>
					(It helps out a lot, and all reports are greatly appreciated!)
				</p>
			</div>
		)
	}

	console.log(classData.meetings)

	return (
		<div className={styles.container}>

		</div>
	);
}
