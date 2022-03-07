import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const App = () => {
	const [data, setData] = useState();

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get('http://localhost:8080/all');
				setData(response.data);
			} catch (error) {
				console.error(error.message);
			}
		})();
	}, []);


	return (
		<div className="App">
			<h1>"Swamiji's Spiritual Pearls"</h1>
			<div>
				{
					!data ?
						<>No data.</>
						:
						data.map(d => <div key={d._id}>
							<h3>{d.question}</h3>
							<p>{d.answer}</p>
						</div>)
				}
			</div>
		</div>
	);
};