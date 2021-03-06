import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
import styles from "../stylesheets/Class.module.scss";
import Card from "../components/Card";
import {openExternalLink} from "../utils/HybridHelpers";

function Class() {
	let source = axios.CancelToken.source();
	const {id} = useParams();
	const [classData, setClassData] = useState({loading: true, data: undefined, error: false});

	let unmounted = false;
	const setData = (obj) => {
		if (!unmounted) {
			setClassData(obj)
		}
	}

	useEffect(() => {
		axios
			.get(`/user/classes/${id}`)
			.then(resp => {
				setData({
					loading: false,
					data: resp.data,
					error: false
				})
			})
			.catch(() => {
				setData({
					loading: false,
					data: undefined,
					error: true
				})
			})


		return (() => {
			if (source) {
				unmounted = true;
				source.cancel("Landing Component got unmounted");
			}
		});
	}, [id]);

	if (classData.loading) {
		return (
			<div className={"message-container"}>
				<h1>Loading Class Data...</h1>
			</div>
		)
	}

	if (classData.error) {
		return (
			<div className={"message-container"}>
				<h1>There was an error loading the class's data!</h1>
				<p>Please report the error <Link to={'#'} className={"text-header"} onClick={() => {
					openExternalLink('https://github.com/DhrumanGupta/WizemenDesktop/issues/new/choose')
				}}>here</Link> (It helps out a lot, and all reports are greatly appreciated!)</p>
			</div>
		)
	}

	const {class: classObj, students: studentsObj, teacher: teacherObj} = classData.data;

	return (
		<div className={styles.container}>
			<h1 className={"text-header"}>{classObj.subject} ({classObj.code})</h1>
			<h3>{teacherObj.name} ({teacherObj.email ? teacherObj.email.toLowerCase() : "N/A"}, {teacherObj.phoneNumber ? teacherObj.phoneNumber : "N/A"})</h3>
			<div className={styles.students}>

				<Card className={`${styles.student} ${styles.teacher}`}>
					<span className={styles.studentImg}>
						<img alt={`${teacherObj.name}'s Image`} src={teacherObj.imagePath} onError={(e) => {
							e.target.onerror = null;
							e.target.src = "https://psg.wizemen.net/images/useravatar.png"
						}}/>
						
					</span>
					<span>
						<p className={"text-header"}>
							{teacherObj.name}
						</p>
						<p>
							{teacherObj.email}
						</p>
					</span>
				</Card>

				{
					studentsObj.map(student => {
						return (
							<Card key={student.userId} className={styles.student}>
								<span className={styles.studentImg}>
									<img alt={`${student.firstName}'s Image`} src={`https://${student.imageUrl}`} onError={(e) => {
										e.target.onerror = null;
										e.target.src = "https://psg.wizemen.net/images/useravatar.png"
									}}/>
								</span>
								<span>
									<p className={"text-header"}>
										{student.firstName} {student.middleName && student.middleName} {student.lastName && student.lastName}
									</p>
									<p>
										{student.studentEmail}
									</p>
								</span>
							</Card>
						)
					})
				}
			</div>
		</div>
	);
}

export default Class;