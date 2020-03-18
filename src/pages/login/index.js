import React, { useState } from 'react';
import styles from './index.module.css';
import Search from 'pages/search';

function Login(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [isSignedIn, setIsSignedIn] = useState(false);

	//const [hasErrors, setHasErrors] = useState(false);
	// const validateUsernamePassword = () => {
	// 	fetch('https://swapi.co/api/people/?search=Luke Skywalker
	// 		.then(res => res.json())
	// 		.then(res => console.log('res', res))
	// 		.catch(() => );
	// };

	const onSubmit = () => {
		setIsLoading(true);
		if (errorMsg) setErrorMsg('');
		fetch(`https://swapi.co/api/people/?search=${username}`)
			.then(res => res.json())
			.then(res => {
				if (res.results.length > 0) {
					let newResult = res.results.filter(
						item => item.birth_year === password && item.name === username
					);

					if (newResult.length > 0) {
						setIsSignedIn(true);
						console.log('Successful login');
					} else {
						setErrorMsg('Invalid credentials');
					}
				} else {
					setErrorMsg('Invalid credentials');
				}
			})
			.catch(() => {})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const onSignOut = () => {
		setIsSignedIn(false);
	};

	if (isSignedIn) return <Search onSignOut={onSignOut} />;
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h1>Login</h1>

				<label>
					Username <span>*</span>
				</label>
				<input
					className={styles.input}
					value={username}
					placeholder="Username"
					onChange={e => {
						if (errorMsg) setErrorMsg('');
						setUsername(e.target.value);
					}}
				/>

				<label>
					Password <span>*</span>
				</label>
				<input
					className={styles.input}
					value={password}
					placeholder="Password"
					type="password"
					onChange={e => {
						if (errorMsg) setErrorMsg('');
						setPassword(e.target.value);
					}}
				/>

				<div className={styles.error}>{errorMsg}</div>

				<button
					className={styles.submitBtn}
					submitBtn
					onClick={onSubmit}
					disabled={isLoading}
				>
					{isLoading ? 'Submitting...' : 'Submit'}
				</button>
			</div>
		</div>
	);
}

export default Login;
