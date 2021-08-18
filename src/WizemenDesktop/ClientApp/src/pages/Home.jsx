import React from 'react';
import styles from '../stylesheets/Home.module.scss';
import {useSpring, animated, config} from "react-spring";
import MasterAttendance from "../components/MasterAttendance";
import Schedule from "../components/Schedule";
import {between} from "../utils/Helpers";

const timeOfDay = () => {
	const curHr = new Date().getHours()
	if (between(curHr, 5, 11)) {
		return "Morning!";
	} else if (between(curHr, 12, 16)) {
		return "Afternoon!";
	} else if (between(curHr, 17, 23)) {
		return "Evening!";
	}
	return "Night! (you should sleep)"
}
 
function Home() {
	const animatedStyles = useSpring({
		config: config.gentle,
		from: {transform: "translateY(-10vh)", opacity: 0},
		to: {transform: "translateY(0%)", opacity: 1},
	});

	return (
		<div className={styles.container}>
			<animated.h1 className={`${styles.intro} text-header`} style={animatedStyles}>
				Good {timeOfDay()}
			</animated.h1>

			<Schedule/>
			<MasterAttendance/>
			
		</div>
	);
}

export default Home;