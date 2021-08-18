import React from 'react';
import styles from '../stylesheets/Header.module.scss';
import {IconContext} from 'react-icons'
import {AiOutlineClose} from 'react-icons/ai';
import {BiFullscreen} from 'react-icons/bi';
import {VscChromeMinimize} from "react-icons/vsc";
import {Link} from "react-router-dom";

function Header() {
	return (
		<IconContext.Provider value={{color: '#fff'}}>
			<div className={styles.navbar}>
				<p className={styles.header}>
					Wizemen Desktop
				</p>

				<Link to={'#'} className={styles.navbarControl}
				      onClick={() => window.electron.ipcRenderer.send("minimize")} title={"Minimize"}>
					<VscChromeMinimize/>
				</Link>

				<Link to={'#'} className={styles.navbarControl}
				      onClick={() => window.electron.ipcRenderer.send("toggle-fullscreen")} title={"Toggle Fullscreen"}>
					<BiFullscreen/>
				</Link>

				<Link to={'#'} className={`${styles.navbarControl} ${styles.exit}`}
				      onClick={() => window.electron.ipcRenderer.send("quit")} title={"Close Application"}>
					<AiOutlineClose/>
				</Link>
				
			</div>
		</IconContext.Provider>
	);
}

export default Header;