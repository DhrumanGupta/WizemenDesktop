import React from 'react';
import styles from '../stylesheets/Home.module.scss';
import {useSpring, animated, config} from "react-spring";

const timeOfDay = () => {
	const curHr = new Date().getHours()
	if (curHr < 12) {
		return "Morning";
	} else if (curHr < 18) {
		return "Afternoon";
	} else {
		return "Evening";
	}
}

function Home() {
	const animatedStyles = useSpring({
		config: config.gentle,
		from: {transform: "translateY(-10vh)", opacity: 0},
		to: {transform: "translateY(0%)", opacity: 1},
	});

	return (
		<div>
			<animated.h1 className={`${styles.intro} ${styles.colorHeader}`} style={animatedStyles}>
				Good {timeOfDay()}, Dhruman!
			</animated.h1>

			<h2>
				Launch
			</h2>
		</div>
	);
}

export default Home;