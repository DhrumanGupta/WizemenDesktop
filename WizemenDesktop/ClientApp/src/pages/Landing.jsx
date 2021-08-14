import React from 'react';
import styles from '../stylesheets/Landing.module.scss';
import {useSpring, animated, config} from "react-spring";
import Button from "../components/Button";
import {Link} from "react-router-dom";

const LinkBtn = (props) => {
	return (
		<Button>
			<Link to={props.to} className={"text-header"}>{props.text}</Link>
		</Button>
	)
}

function Landing() {
	const animatedStylesIntro = useSpring({
		config: config.gentle,
		from: {transform: "translateY(-10vh)", opacity: 0},
		to: {transform: "translateY(0%)", opacity: 1},
	});

	const animatedStylesBtn = useSpring({
		config: config.stiff,
		from: {transform: "translateY(2vh)", opacity: 0},
		to: {transform: "translateY(0%)", opacity: 1},
	});

	return (
		<div className={styles.container}>
			<animated.p className={`${styles.intro} text-header`} style={animatedStylesIntro}>
				Wizemen Desktop
			</animated.p>
			
			<animated.div className={styles.btnGroup} style={animatedStylesBtn}>
				<LinkBtn text="Home" to={"/home"}/> 
				<LinkBtn text="Meetings" to={"/meetings"}/>
				<LinkBtn text="Classes" to={"/classes"}/>
			</animated.div>

		</div>
	);
}

export default Landing;