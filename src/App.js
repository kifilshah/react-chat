import { useState } from 'react';
import './App.scss';
import { Configuration, OpenAIApi } from "openai";
import moment from 'moment';
import 'moment/locale/ko';

function App() {
	const [value, setValue] = useState('');
	const [msg, setMsg] = useState([]);
	const [loading, setLoading] = useState(false);

	const configuration = new Configuration({
		apiKey: process.env.REACT_APP_API_KEY,
	});
	const openai = new OpenAIApi(configuration);

	return (
		<div className="App">
			<div className="chat-content">
				{
					msg.map((data, i) => (
						<>
							<div className="line mine">
								<span className="chat-box">{data.prompt}</span>
								<span className="time">{data.promptTime}</span>
							</div>
							<div className="line">
								<span className="chat-box">{data.res}</span>
								<span className="time">{data.resTime}</span>
							</div>
						</>
					))
				}
			</div>

			<form>
				<input type="text" placeholder="Type your message." value={value} onChange={(e) => {
					setValue(e.target.value);
				}} />
				<button onClick={(e) => {
					e.preventDefault();
					setLoading(true);

					const promptTime = moment().format('HH:mm:ss');

					openai.createCompletion({
						model: "text-davinci-003",
						prompt: value,
						temperature: 0.7,
						max_tokens: 256,
						top_p: 1,
						frequency_penalty: 0,
						presence_penalty: 0,
					}).then((result) => {
						console.log(result.data);
						setLoading(false);

						const resTime = moment().format('HH:mm:ss');

						const chat = {
							prompt: value,
							res: result.data.choices[0].text,
							promptTime: promptTime,
							resTime: resTime
						}

						const copy = [...msg]
						copy.push(chat)
						setMsg(copy)
						setValue('');

					});

				}} disabled={!value}>Send</button>
			</form>

		</div>
	);
}

export default App;
