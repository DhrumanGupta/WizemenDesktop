import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import listStyles from '../stylesheets/Lists.common.module.scss';

export default function Classes() {
	const [classData, setClassData] = useState({loading: true, classes: undefined, error: false});

	useEffect(() => {
		axios
			.get('/user/classes')
			.then(resp => {
				// Sort all classes by id
				resp.data.sort((a, b) => (a.classId > b.classId) ? 1 : -1)
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
			<div className={"message-container"}>
				<h1>Loading Classes...</h1>
			</div>
		)
	}

	if (classData.error) {
		return (
			<div className={"message-container"}>
				<h1>There was an error loading your classes!</h1>
				<p>Please report the error
					<Link to={'#'} className={"text-header"} onClick={() => {
						window.electron.ipcRenderer.send('open-link', 'https://github.com/DhrumanGupta/WizemenDesktop/issues/new/choose')
					}}>here</Link> (It helps out a lot, and all reports are greatly appreciated!)
				</p>
			</div>
		)
	}

	return (
		<div className={listStyles.container}>
			{
				classData.classes.map(item => {
					return (
						<Link key={item.classId} to={`/classes/${item.classId}`}>
							<p className={`text-header ${listStyles.header}`}>{item.subject} ({item.course})</p>
							<p className={listStyles.subHeader}>{item.teacherName} ({item.classCode})</p>
								{/*{JSON.stringify(item)}*/}
							</Link>
					);
				})
			}
		</div>
	);
}
