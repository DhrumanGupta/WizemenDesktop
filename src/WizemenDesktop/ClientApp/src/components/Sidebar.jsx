import React from 'react';
import styles from '../stylesheets/Sidebar.module.scss';
import {NavLink} from "react-router-dom";
import {Routes} from "../data/RoutesData";
import {FaAngleDoubleRight} from "react-icons/fa";

function Sidebar() {
	const NavItem = (props) => {
		return (
			<li className={styles.navItem}>
				<NavLink exact={props.exact} to={props.to} className={styles.navLink} activeClassName={styles.active}>
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

				{
					Routes.map(route => {
						return (
							<NavItem exact={route.sidebarExact} key={route.path} to={route.path} text={route.title} icon={route.icon}/>
						)
					})
				}
			</ul>
		</nav>
	);
}

export default Sidebar;