import Card from "./Card";
import styles from "../stylesheets/Attendance.module.scss";
import axios from "axios";
import {useEffect, useState} from "react";

const MasterAttendance = () => {
	const [masterAttendance, setMasterAttendance] = useState({totalDays: 1, present: 0, absent: 0, imperfect: 0});

	useEffect(() => {
		axios.get('/user/masterAttendance')
			.then(resp => {
				setMasterAttendance(resp.data);
			})
	}, []);

	const presentPercentage = Math.round((masterAttendance.present / masterAttendance.totalDays) * 100);
	const absentPercentage = Math.round((masterAttendance.absent / masterAttendance.totalDays) * 100);
	const imperfectPercentage = Math.round((masterAttendance.imperfect / masterAttendance.totalDays) * 100);
	
	return (
		<Card className={styles.attendanceContainer}>
			<h3 className="text-header">
				Master attendance
			</h3>

			<div className={styles.progressBarGroup}>
				<div className={styles.progressBarLabelGroup}>
					<p>Present:</p>
					<p>{presentPercentage}%</p>
				</div>
				<div className={styles.progressBar}>
					<div className={`${styles.progressBarFill} bg-success`} style={{width: `${presentPercentage}%`}}/>
				</div>
			</div>

			<div className={styles.progressBarGroup}>
				<div className={styles.progressBarLabelGroup}>
					<p>Absent:</p>
					<p>{absentPercentage}%</p>
				</div>
				<div className={styles.progressBar}>
					<div className={`${styles.progressBarFill} bg-danger`} style={{width: `${absentPercentage}%`}}/>
				</div>
			</div>

			<div className={styles.progressBarGroup}>
				<div className={styles.progressBarLabelGroup}>
					<p>Imperfect:</p>
					<p>{imperfectPercentage}%</p>
				</div>
				<div className={styles.progressBar}>
					<div className={`${styles.progressBarFill} bg-warning`} style={{width: `${imperfectPercentage}%`}}/>
				</div>
			</div>
		</Card>
	)
}

export default MasterAttendance;