import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import listStyles from '../stylesheets/Lists.common.module.scss';
import {openExternalLink} from "../utils/HybridHelpers";

export default function Classes() {
	let source = axios.CancelToken.source();
	const [classData, setClassData] = useState({loading: true, classes: undefined, error: false});

	let unmounted = false;
	const setData = (obj) => {
		if (!unmounted) {
			setClassData(obj)
		}
	}
	
	useEffect(() => {
		axios
			.get('/user/classes')
			.then(resp => {
				// Sort all classes by id
				resp.data.sort((a, b) => (a.id > b.id) ? 1 : -1)
				setData({
					loading: false,
					classes: resp.data,
					error: false
				})
			})
			.catch(() => {
				setData({
					loading: false,
					classes: undefined,
					error: true
				})
			})
		
		return (() => {
			if (source) {
				unmounted = true;
				source.cancel("Landing Component got unmounted");
			}
		});
	}, []);


	if (classData.loading) {
		return (
			<div className={"message-container"}>
				<h1>Loading Classes...</h1>
			</div>
		)
	}

	if (classData.error) {
		return (
			<div className={"message-container"}>
				<h1>There was an error loading your classes!</h1>
				<p>Please report the error
					<Link to={'#'} className={"text-header"} onClick={() => {
						openExternalLink('https://github.com/DhrumanGupta/WizemenDesktop/issues/new/choose')
					}}>here</Link> (It helps out a lot, and all reports are greatly appreciated!)
				</p>
			</div>
		)
	}

	return (
		<div className={listStyles.container}>
			{
				classData.classes.map(item => {
					return (
						<Link key={item.id} to={`/classes/${item.id}`}>
							<p className={`text-header ${listStyles.header}`}>{item.subject} ({item.name})</p>
							<p>{item.teacherName} ({item.code})</p>
							</Link>
					);
				})
			}
		</div>
	);
}
