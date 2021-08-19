import React, {useState} from 'react';
import styles from '../stylesheets/Settings.module.scss';
import {SettingsConsumer} from "../components/contexts/settingsContext";
import {UserConsumer} from "../components/contexts/userContext";
import {BiSlider} from "react-icons/bi";
import Card from "../components/Card";
import Button from "../components/Button";
import axios from "axios";
import {FiLogOut} from "react-icons/fi";
import {AiOutlineInfoCircle} from "react-icons/ai";
import {Link} from "react-router-dom";
import {openExternalLink} from "../utils/HybridHelpers";

const Preferences = () => (
	<SettingsConsumer>
		{
			({settings, updateThenSetSettings: setSettings}) => {
				const handleFontSizeChange = (e) => {
					setSettings({...settings, fontSize: e.target.value}
					)
				}

				const handleThemeChange = (e) => {
					setSettings({...settings, dark: e.target.checked}
					)
				}

				const handleNotifyMeetingChange = (e) => {
					setSettings({...settings, notifyMeetings: e.target.checked}
					)
				}

				const handleAutoLaunchChange = (e) => {
					setSettings({...settings, autoLaunchMeetings: e.target.checked}
					)
				}

				return (
					<React.Fragment>
						<div className={styles.headerContainer}>
							<span className={styles.headerIcon}><BiSlider/></span><h3
							className={`text-header ${styles.header}`}>Preferences</h3>
						</div>
						<Card>
							<div className={styles.inputContainer}>
								<label>Font size: </label>
								<select name="School" onChange={handleFontSizeChange} value={settings ? settings.fontSize : 16}>
									<option value={14}>14 (Small)</option>
									<option value={16}>16 (Default)</option>
									<option value={18}>18 (Large)</option>
									<option value={20}>20 (Very Large)</option>
								</select>
							</div>

							<div className={styles.inputContainer}>
								<label>Dark Mode:</label>
								<input type={"checkbox"} onChange={handleThemeChange} defaultChecked={settings?.dark}/>
							</div>

							<div>
								<div className={styles.inputContainer}>
									<label>Notify Meetings</label>
									<input type={"checkbox"} onChange={handleNotifyMeetingChange}
									       defaultChecked={settings?.notifyMeetings}/>
								</div>

								<p className={styles.hint}>
									Checking this will send a notification 5 minutes prior to your next meeting
								</p>
							</div>

							<div>
								<div className={styles.inputContainer}>
									<label>Automatically Launch Meeting</label>
									<input type={"checkbox"} onChange={handleAutoLaunchChange}
									       defaultChecked={settings?.autoLaunchMeetings}/>
								</div>

								<p className={styles.hint}>
									Checking this will automatically launch your meetings when their set time is reached.
								</p>
							</div>

						</Card>
					</React.Fragment>
				)
			}
		}
	</SettingsConsumer>
)

const Logout = () => {
	const initState = {confirmation: false, text: "Logout"};
	const [logoutBtnState, setLogoutBtnState] = useState(initState);
	const [loggedOut, setLoggedOut] = useState(false);
	let logoutIdentifier;

	const handleLogout = () => {
		if (!logoutBtnState.confirmation) {
			setLogoutBtnState({
				confirmation: true,
				text: "Are you sure?"
			})

			logoutIdentifier = setTimeout(() => {
				setLogoutBtnState(initState);
			}, 1500)
		} else {
			if (logoutIdentifier) {
				clearTimeout(logoutIdentifier)
			}

			axios
				.post('/user/logout')
				.then(() => {
					setLoggedOut(true)
				})
		}
	}

	return (
		<UserConsumer>
			{
				(setLoggedIn) => {
					if (loggedOut) {
						setLoggedIn(false)
					}

					return (
						<Button className={`bg-danger ${styles.logoutContainer}`} handleClick={handleLogout}>
						<span>
							<FiLogOut/>
						</span>
							{logoutBtnState.text}
						</Button>
					)
				}
			}
		</UserConsumer>
	)
}

const Info = () => {
	return (
		<React.Fragment>
			<div className={styles.headerContainer}>
				<span className={styles.headerIcon}><AiOutlineInfoCircle/></span><h3
				className={`text-header ${styles.header}`}>About this application</h3>
			</div>
			<Card>
				<p>
					The source code (the code of the entire application) can be found <Link to={'#'} className={"text-header"} onClick={() => {
					openExternalLink('https://github.com/DhrumanGupta/WizemenDesktop')}}>here</Link>.
				</p>
				<p>
					This application is in no way endorsed, supported or created by the official wizemen team. This is just a
					personal project, and has come to life with the help of awesome people.
				</p>
				<br/>
				Contributors:
				<ul className={styles.contributorsContainer}>
					<li>
						<Link to={'#'} className={"text-header"} onClick={() => {
							openExternalLink('https://github.com/DhrumanGupta')
						}}>Dhruman Gupta</Link>
					</li>
					<li>
						<Link to={'#'} className={"text-header"} onClick={() => {
							openExternalLink('https://github.com/PreciousWarrior')
						}}>Kshitij Bhatia</Link>
					</li>
				</ul>
			</Card>
		</React.Fragment>
	)
}

function Settings() {
	return (
		<div className={styles.container}>
			<Preferences/>
			<br/>
			<Info/>
			<br/>
			<Logout/>
		</div>
	);
}

export default Settings;