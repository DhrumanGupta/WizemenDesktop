import React, {useEffect, useState} from 'react';
import styles from '../stylesheets/Home.module.scss';
import {useSpring, animated, config} from "react-spring";
import axios from "axios";
import Card from "../components/Card";

function between(x, min, max) {
	return x >= min && x <= max;
}

const timeOfDay = () => {
	const curHr = new Date().getHours()
	if (between(curHr, 5, 11)) {
		return "Morning";
	} else if (between(curHr, 12, 16)) {
		return "Evening";
	} else if (between(curHr, 17, 23)) {
		return "Night";
	}
	return "Night (you should sleep)"
}

function Home() {
	const animatedStyles = useSpring({
		config: config.gentle,
		from: {transform: "translateY(-10vh)", opacity: 0},
		to: {transform: "translateY(0%)", opacity: 1},
	});

	const [masterAttendance, setMasterAttendance] = useState({totalDays: 1, present: 0, absent: 0, imperfect: 0});

	useEffect(() => {
		axios.get('/user/masterAttendance')
			.then(resp => {
				setMasterAttendance(resp.data);
			})
	}, []);

	const presentPercentage = (masterAttendance.present / masterAttendance.totalDays) * 100;
	const absentPercentage = (masterAttendance.absent / masterAttendance.totalDays) * 100;
	const imperfectPercentage = (masterAttendance.imperfect / masterAttendance.totalDays) * 100;

	return (
		<div className={styles.container}>
			<animated.h1 className={`${styles.intro} text-header`} style={animatedStyles}>
				Good {timeOfDay()}, Dhruman!
			</animated.h1>
			<br/>

			<div className={styles.scheduleContainer} id="schedule_data">

					<div className="text-header text-center">
						Lesson
					</div>
				
					<div className="text-header text-center">
						Monday <span data-id="dateof" className="dateofweek" id="Monday">09/08/2021</span>
					</div>
				
					<div className="text-header text-center">
						Tuesday <span data-id="dateof" className="dateofweek" id="Tuesday">10/08/2021</span>
					</div>
				
					<div className="text-header text-center">
						Wednesday <span data-id="dateof" className="dateofweek" id="Wednesday">11/08/2021</span>
					</div>
				
					<div className="text-header text-center">
						Thursday <span data-id="dateof" className="dateofweek" id="Thursday">12/08/2021</span>
					</div>
				
					<div className="text-header text-center">
						Friday <span data-id="dateof" className="dateofweek" id="Friday">13/08/2021</span>
					</div>


				{/*<tbody id="classschedulebody">*/}
				{/*<tr data-time-start="0830">*/}
				{/*	<td className="darkborder text-center"><span className="dateofweek">1</span>08:30-08:50</td>*/}
				{/*	<td className="darkborder" data-day="Monday"><a href="javascript:;" data-name="classlink" data-id="11745"*/}
				{/*	                                                data-teacherid="" data-classname="US Form Tutor"> <span*/}
				{/*		className="dateofweek subject-name">11eFT</span></a><span className="dateofweek">US Form Tutor</span></td>*/}
				{/*	<td className="darkborder" data-day="Tuesday"><a href="javascript:;" data-name="classlink" data-id="11745"*/}
				{/*	                                                 data-teacherid="" data-classname="US Form Tutor"> <span*/}
				{/*		className="dateofweek subject-name">11eFT</span></a><span className="dateofweek">US Form Tutor</span></td>*/}
				{/*	<td className="darkborder" data-day="Wednesday"><a href="javascript:;" data-name="classlink" data-id="11745"*/}
				{/*	                                                   data-teacherid="" data-classname="US Form Tutor"> <span*/}
				{/*		className="dateofweek subject-name">11eFT</span></a><span className="dateofweek">US Form Tutor</span></td>*/}
				{/*	<td className="darkborder" data-day="Thursday"><a href="javascript:;" data-name="classlink" data-id="11745"*/}
				{/*	                                                  data-teacherid="" data-classname="US Form Tutor"> <span*/}
				{/*		className="dateofweek subject-name">11eFT</span></a><span className="dateofweek">US Form Tutor</span></td>*/}
				{/*	<td className="darkborder" data-day="Friday"><a href="javascript:;" data-name="classlink" data-id="11745"*/}
				{/*	                                                data-teacherid="" data-classname="US Form Tutor"> <span*/}
				{/*		className="dateofweek subject-name">11eFT</span></a><span className="dateofweek">US Form Tutor</span></td>*/}
				{/*</tr>*/}
				{/*<tr data-time-start="0905">*/}
				{/*	<td className="darkborder text-center"><span className="dateofweek">2</span>09:05-09:55</td>*/}
				{/*	<td className="darkborder" data-day="Monday"><a href="javascript:;" data-name="classlink" data-id="11980"*/}
				{/*	                                                data-teacherid="" data-classname="Economics"> <span*/}
				{/*		className="dateofweek subject-name">11B4ECH-2</span></a><span className="dateofweek">Economics</span></td>*/}
				{/*	<td className="darkborder" data-day="Tuesday"><a href="javascript:;" data-name="classlink" data-id="11980"*/}
				{/*	                                                 data-teacherid="" data-classname="Economics"> <span*/}
				{/*		className="dateofweek subject-name">11B4ECH-2</span></a><span className="dateofweek">Economics</span></td>*/}
				{/*	<td className="darkborder" data-day="Wednesday"><a href="javascript:;" data-name="classlink" data-id="11673"*/}
				{/*	                                                   data-teacherid=""*/}
				{/*	                                                   data-classname="English A Language and Literature"> <span*/}
				{/*		className="dateofweek subject-name">11B1ELLSL-Divya</span></a><span className="dateofweek">English A Language and Literature</span>*/}
				{/*	</td>*/}
				{/*	<td className="darkborder" data-day="Thursday"><a href="javascript:;" data-name="classlink" data-id="11744"*/}
				{/*	                                                  data-teacherid="" data-classname="IB TOK"> <span*/}
				{/*		className="dateofweek subject-name">11 TOK-Group 6</span></a><span className="dateofweek">IB TOK</span></td>*/}
				{/*	<td className="darkborder" data-day="Friday"><a href="javascript:;" data-name="classlink" data-id="11673"*/}
				{/*	                                                data-teacherid=""*/}
				{/*	                                                data-classname="English A Language and Literature"> <span*/}
				{/*		className="dateofweek subject-name">11B1ELLSL-Divya</span></a><span className="dateofweek">English A Language and Literature</span>*/}
				{/*	</td>*/}
				{/*</tr>*/}
				{/*<tr data-time-start="1005">*/}
				{/*	<td className="darkborder text-center"><span className="dateofweek">3</span>10:05-10:55</td>*/}
				{/*	<td className="darkborder" data-day="Monday"></td>*/}
				{/*	<td className="darkborder" data-day="Tuesday"><a href="javascript:;" data-name="classlink" data-id="11716"*/}
				{/*	                                                 data-teacherid="" data-classname="Mathematics AA"> <span*/}
				{/*		className="dateofweek subject-name">11B5MAAH</span></a><span className="dateofweek">Mathematics AA</span>*/}
				{/*	</td>*/}
				{/*	<td className="darkborder" data-day="Wednesday"><a href="javascript:;" data-name="classlink" data-id="11701"*/}
				{/*	                                                   data-teacherid="" data-classname="Physics"> <span*/}
				{/*		className="dateofweek subject-name">11B3PHS</span></a><span className="dateofweek">Physics</span></td>*/}
				{/*	<td className="darkborder" data-day="Thursday"><a href="javascript:;" data-name="classlink" data-id="11681"*/}
				{/*	                                                  data-teacherid="" data-classname="Hindi B"> <span*/}
				{/*		className="dateofweek subject-name">11B2HNBS-1</span></a><span className="dateofweek">Hindi B</span></td>*/}
				{/*	<td className="darkborder" data-day="Friday"></td>*/}
				{/*</tr>*/}
				{/*<tr data-time-start="1105">*/}
				{/*	<td className="darkborder text-center"><span className="dateofweek">4</span>11:05-11:55</td>*/}
				{/*	<td className="darkborder" data-day="Monday"><a href="javascript:;" data-name="classlink" data-id="11722"*/}
				{/*	                                                data-teacherid="" data-classname="Computer Science"> <span*/}
				{/*		className="dateofweek subject-name">11B6CSH- 1</span></a><span*/}
				{/*		className="dateofweek">Computer Science</span></td>*/}
				{/*	<td className="darkborder" data-day="Tuesday"><a href="javascript:;" data-name="classlink" data-id="11983"*/}
				{/*	                                                 data-teacherid=""*/}
				{/*	                                                 data-classname="Creativity, Action &amp; Service"> <span*/}
				{/*		className="dateofweek subject-name">CAS Supervisor - 1</span></a><span*/}
				{/*		className="dateofweek">Creativity, Action &amp; Service</span></td>*/}
				{/*	<td className="darkborder" data-day="Wednesday"><a href="javascript:;" data-name="classlink" data-id="11681"*/}
				{/*	                                                   data-teacherid="" data-classname="Hindi B"> <span*/}
				{/*		className="dateofweek subject-name">11B2HNBS-1</span></a><span className="dateofweek">Hindi B</span></td>*/}
				{/*	<td className="darkborder" data-day="Thursday"><a href="javascript:;" data-name="classlink" data-id="11722"*/}
				{/*	                                                  data-teacherid="" data-classname="Computer Science"> <span*/}
				{/*		className="dateofweek subject-name">11B6CSH- 1</span></a><span*/}
				{/*		className="dateofweek">Computer Science</span></td>*/}
				{/*	<td className="darkborder" data-day="Friday"><a href="javascript:;" data-name="classlink" data-id="11716"*/}
				{/*	                                                data-teacherid="" data-classname="Mathematics AA"> <span*/}
				{/*		className="dateofweek subject-name">11B5MAAH</span></a><span className="dateofweek">Mathematics AA</span>*/}
				{/*	</td>*/}
				{/*</tr>*/}
				{/*<tr data-time-start="1205">*/}
				{/*	<td className="darkborder text-center"><span className="dateofweek">5</span>12:05-12:55</td>*/}
				{/*	<td className="darkborder" data-day="Monday"><a href="javascript:;" data-name="classlink" data-id="11980"*/}
				{/*	                                                data-teacherid="" data-classname="Economics"> <span*/}
				{/*		className="dateofweek subject-name">11B4ECH-2</span></a><span className="dateofweek">Economics</span></td>*/}
				{/*	<td className="darkborder" data-day="Tuesday"><a href="javascript:;" data-name="classlink" data-id="11983"*/}
				{/*	                                                 data-teacherid=""*/}
				{/*	                                                 data-classname="Creativity, Action &amp; Service"> <span*/}
				{/*		className="dateofweek subject-name">CAS Supervisor - 1</span></a><span*/}
				{/*		className="dateofweek">Creativity, Action &amp; Service</span></td>*/}
				{/*	<td className="darkborder" data-day="Wednesday"><a href="javascript:;" data-name="classlink" data-id="11744"*/}
				{/*	                                                   data-teacherid="" data-classname="IB TOK"> <span*/}
				{/*		className="dateofweek subject-name">11 TOK-Group 6</span></a><span className="dateofweek">IB TOK</span></td>*/}
				{/*	<td className="darkborder" data-day="Thursday"><a href="javascript:;" data-name="classlink" data-id="11673"*/}
				{/*	                                                  data-teacherid=""*/}
				{/*	                                                  data-classname="English A Language and Literature"> <span*/}
				{/*		className="dateofweek subject-name">11B1ELLSL-Divya</span></a><span className="dateofweek">English A Language and Literature</span>*/}
				{/*	</td>*/}
				{/*	<td className="darkborder" data-day="Friday"><a href="javascript:;" data-name="classlink" data-id="11701"*/}
				{/*	                                                data-teacherid="" data-classname="Physics"> <span*/}
				{/*		className="dateofweek subject-name">11B3PHS</span></a><span className="dateofweek">Physics</span></td>*/}
				{/*</tr>*/}
				{/*<tr data-time-start="1335">*/}
				{/*	<td className="darkborder text-center"><span className="dateofweek">6</span>13:35-14:25</td>*/}
				{/*	<td className="darkborder" data-day="Monday"><a href="javascript:;" data-name="classlink" data-id="11716"*/}
				{/*	                                                data-teacherid="" data-classname="Mathematics AA"> <span*/}
				{/*		className="dateofweek subject-name">11B5MAAH</span></a><span className="dateofweek">Mathematics AA</span>*/}
				{/*	</td>*/}
				{/*	<td className="darkborder" data-day="Tuesday"><a href="javascript:;" data-name="classlink" data-id="11722"*/}
				{/*	                                                 data-teacherid="" data-classname="Computer Science"> <span*/}
				{/*		className="dateofweek subject-name">11B6CSH- 1</span></a><span*/}
				{/*		className="dateofweek">Computer Science</span></td>*/}
				{/*	<td className="darkborder" data-day="Wednesday"><a href="javascript:;" data-name="classlink" data-id="11980"*/}
				{/*	                                                   data-teacherid="" data-classname="Economics"> <span*/}
				{/*		className="dateofweek subject-name">11B4ECH-2</span></a><span className="dateofweek">Economics</span></td>*/}
				{/*	<td className="darkborder" data-day="Thursday"><a href="javascript:;" data-name="classlink" data-id="11701"*/}
				{/*	                                                  data-teacherid="" data-classname="Physics"> <span*/}
				{/*		className="dateofweek subject-name">11B3PHS</span></a><span className="dateofweek">Physics</span></td>*/}
				{/*	<td className="darkborder" data-day="Friday"><a href="javascript:;" data-name="classlink" data-id="11681"*/}
				{/*	                                                data-teacherid="" data-classname="Hindi B"> <span*/}
				{/*		className="dateofweek subject-name">11B2HNBS-1</span></a><span className="dateofweek">Hindi B</span></td>*/}
				{/*</tr>*/}
				{/*<tr data-time-start="1425">*/}
				{/*	<td className="darkborder text-center"><span className="dateofweek">7</span>14:25-15:15</td>*/}
				{/*	<td className="darkborder" data-day="Monday"><a href="javascript:;" data-name="classlink" data-id="11722"*/}
				{/*	                                                data-teacherid="" data-classname="Computer Science"> <span*/}
				{/*		className="dateofweek subject-name">11B6CSH- 1</span></a><span*/}
				{/*		className="dateofweek">Computer Science</span></td>*/}
				{/*	<td className="darkborder" data-day="Tuesday"/>*/}
				{/*	<td className="darkborder" data-day="Wednesday"><a href="javascript:;" data-name="classlink" data-id="11716"*/}
				{/*	                                                   data-teacherid="" data-classname="Mathematics AA"> <span*/}
				{/*		className="dateofweek subject-name">11B5MAAH</span></a><span className="dateofweek">Mathematics AA</span>*/}
				{/*	</td>*/}
				{/*	<td className="darkborder" data-day="Thursday"/>*/}
				{/*	<td className="darkborder" data-day="Friday"><a href="javascript:;" data-name="classlink" data-id="11701"*/}
				{/*	                                                data-teacherid="" data-classname="Physics"> <span*/}
				{/*		className="dateofweek subject-name">11B3PHS</span></a><span className="dateofweek">Physics</span></td>*/}
				{/*</tr>*/}
				{/*</tbody>*/}
			</div>
			
			<Card className={styles.attendanceContainer}>
				<h2 className={styles.colorHeader}>
					Master attendance
				</h2>

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
			

		</div>
	);
}

export default Home;