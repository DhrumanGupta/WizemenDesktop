import React, {useRef, useState} from 'react';
import styles from '../stylesheets/Login.module.scss';
import Button from "../components/Button";
import axios from "axios";
import {Redirect} from 'react-router-dom'

function Login(props) {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const schoolRef = useRef(null);
	const rememberMeRef = useRef(null);

	const [error, setError] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault()
		const data = {
			credentials: {
				email: emailRef.current.value,
				password: passwordRef.current.value,
				schoolCode: Number(schoolRef.current.value)
			},
			rememberMe: rememberMeRef.current.checked
		};
		passwordRef.current.value = '';

		axios
			.post('/user/start', data)
			.then(r => {
				setLoggedIn(true);
			})
			.catch(() => {
				setError("Invalid credentials")
			})
	}

	if (loggedIn) {
		props.setLoggedIn(true)
		return <Redirect to={'/'}/>
	}

	return (
		<div className={styles.container}>
			<p className={styles.error}>
				{error}
			</p>

			<p className={styles.header}>
				Please Login
			</p>

			<form onSubmit={handleSubmit} className={styles.formControl}>
				<div className={styles.inputContainer}>
					<input type={"email"} name="Email" placeholder="x" ref={emailRef} required/>
					<label htmlFor="Email">Email</label>
				</div>

				<div className={styles.inputContainer}>
					<input type={"password"} name="Password" placeholder="x" ref={passwordRef} required/>
					<label htmlFor="Password">Password</label>
				</div>

				<div className={styles.inputContainer}>
					<select name="School" ref={schoolRef}>
						<option value={0}>Pathways School Noida</option>
						<option value={1}>Pathways School Gurgaon</option>
						<option value={2}>Pathways World School</option>
					</select>
					<label htmlFor={"School"}>School Name</label>
				</div>

				<div className={styles.rememberMe}>
					<input type={"checkbox"} ref={rememberMeRef}/>
					<label>Remember me</label>
				</div>

				<Button>Login</Button>
			</form>
		</div>
	);
}

export default Login;