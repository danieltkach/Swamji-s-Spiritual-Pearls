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
							<p>{d.teaching}</p>
							{/* <p>{d.questions[0].question}</p>
							<p>{d.questions[0].answer}</p> */}
						</div>)
				}
			</div>
		</div>
	);
};