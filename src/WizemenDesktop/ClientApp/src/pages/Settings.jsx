import React from 'react';
import styles from '../stylesheets/Settings.module.scss';
import {SettingsConsumer} from "../components/contexts/settingsContext";
import {BiSlider} from "react-icons/bi";
import Card from "../components/Card";

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

function Settings() {
	return (
		<div className={styles.container}>
			<Preferences/>
		</div>
	);
}

export default Settings;