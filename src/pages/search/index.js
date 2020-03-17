import React, { useState } from 'react';
import styles from './index.module.css';

import { searchRes } from 'mockData';

function Search({ onSignOut }) {
	const [searchValue, setSearchValue] = useState('');
	const [results, setResults] = useState([]);
	const [planetDetails, setPlanetDetails] = useState(null);
	const [loading, setLoading] = useState(false);

	const searchCall = searchStr => {
		setSearchValue(searchStr);
		setLoading(true);
		setResults([]);
		if (searchStr) {
			fetch(`https://swapi.co/api/planets/?search=${searchStr}`)
				// new Promise(resolve => {
				// 	resolve(searchRes);
				// })
				.then(res => res.json())
				.then(res => {
					if (res.results.length > 0) {
						let total = 0;

						res.results.forEach(item => {
							// let tmp = Math.ceil(population / minVal);
							let pop = Number.parseInt(item.population);
							if (!isNaN(pop)) total += Number.parseInt(item.population);
							// console.log(Number.parseInt(item.population));
						});

						for (let i = 0; i < res.results.length; i++) {
							let pop = Number.parseInt(res.results[i].population);

							if (!isNaN(pop))
								res.results[i].padding = Math.floor(
									(Number.parseInt(res.results[i].population) / total) * 100
								);
							else res.results[i].padding = 0;
							console.log(res.results[i].padding);
						}
						setResults(res.results);
					} else {
						setResults([]);
					}
				})
				.catch(e => {})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	const fetchResults = () => {
		if (results.length > 0) {
			return results.map(item => {
				const {
					name,
					rotation_period,
					orbital_period,
					population,
					padding
				} = item;
				//let padding = 1;

				return (
					<tr key={name}>
						<td
							className={styles.planetName}
							style={{ padding: padding }}
							// style={{ width: padding * 2, height: padding * 2 }}
							onClick={e => setPlanetDetails(item)}
						>
							{name}
						</td>
						{/* <td>{rotation_period}</td>
            <td>{orbital_period}</td>
            <td>{population}</td> */}
					</tr>
				);
			});
		} else {
			if (loading && searchValue)
				return (
					<tr>
						<td>Loading Data.</td>
					</tr>
				);
			else if (searchValue) {
				return (
					<tr>
						<td>No data found.</td>
					</tr>
				);
			} else {
				return (
					<tr>
						<td></td>
					</tr>
				);
			}
		}
	};

	return (
		<div>
			<span className={styles.signout} onClick={onSignOut}>
				Sign Out
			</span>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<input
					autoFocus
					placeholder="Search by planet name"
					className={styles.searchInput}
					onChange={e => {
						searchCall(e.target.value);
					}}
				></input>
			</div>
			<div>
				<table>
					<tbody>{fetchResults()}</tbody>
				</table>
			</div>
			{planetDetails && (
				<div>
					<h1>Planet Details</h1>
					<ul>
						<li>NAME : {planetDetails.name}</li>
						<li>ROTATION PERIOD : {planetDetails.rotation_period}</li>
						<li>ORBITAL PERIOD : {planetDetails.orbital_period}</li>
						<li>POPULATION : {planetDetails.population}</li>
					</ul>
				</div>
			)}
		</div>
	);
}
export default Search;
