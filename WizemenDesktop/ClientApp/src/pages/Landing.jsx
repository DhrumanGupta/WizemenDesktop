import React from 'react';
import styles from '../stylesheets/Landing.module.scss';
import {useSpring, animated, config, useTrail} from "react-spring";
import Button from "../components/Button";
import {Link} from "react-router-dom";
import {Routes} from '../data/RoutesData';

const ButtonTrail = ({data}) => {
	const trail = useTrail(data.length, {
		config: config.stiff,
		from: {transform: "translateY(10vh)", opacity: 0.5},
		to: {transform: "translateY(0%)", opacity: 1},
	})
	return (
		<div className={styles.btnGroup}>
			{trail.map((style, index) => (
				<animated.span style={style} key={index}>
					<Button>
						<Link to={data[index].path} className={"text-header"}>{data[index].title}</Link>
					</Button>
				</animated.span>
			))}
		</div>
	)
}

function Landing() {
	const animatedStylesIntro = useSpring({
		config: config.gentle,
		from: {transform: "translateY(-10vh)", opacity: 0},
		to: {transform: "translateY(0%)", opacity: 1},
	});

	return (
		<div className={styles.container}>
			<animated.p className={`${styles.intro} text-header`} style={animatedStylesIntro}>
				Wizemen Desktop
			</animated.p>
			<ButtonTrail data={Routes}/>
		</div>
	);
}

export default Landing;