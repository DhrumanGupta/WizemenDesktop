import React from 'react';
import styles from '../stylesheets/Sidebar.module.scss';
import {AiFillHome} from "react-icons/ai";
import {BsCameraVideoFill, BsPersonFill} from "react-icons/bs";
import {FiSettings} from "react-icons/fi";
import {NavLink} from "react-router-dom";
import {FaAngleDoubleRight} from "react-icons/fa";

function Sidebar() {
	const NavItem = (props) => {
		return (
			<li className={styles.navItem}>
				<NavLink exact to={props.to} className={styles.navLink} activeClassName={styles.active}>
					<props.icon/>
					<span className={`${styles.linkText}`}>{props.text}</span>
				</NavLink>
			</li>
		)
	}
	
	return (
		<nav className={styles.navbar}>
			<ul className={styles.navbarNav}>
				
				<li className={styles.logo}>
					<NavLink exact to={"/"} className={styles.navLink} activeClassName={styles.active}>
						<span className={styles.linkText}>Wizemen</span>
						<FaAngleDoubleRight/>
					</NavLink>
				</li>
				
				<NavItem to={'/home'} icon={AiFillHome} text={"Home"}/>
				<NavItem to={'/meetings'} icon={BsCameraVideoFill} text={"Meetings"}/>
				<NavItem to={'/classes'} icon={BsPersonFill} text={"Classes"}/>
				<NavItem to={'/settings'} icon={FiSettings} text={"Settings"}/>
			</ul>
		</nav>
	);
}

export default Sidebar;