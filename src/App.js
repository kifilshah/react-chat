import { useState } from 'react';
import './App.scss';
import { Configuration, OpenAIApi } from "openai";

function App() {
	const [value, setValue] = useState('');
	const [msg, setMsg] = useState([]);

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
							<div className="line">
								<span className="chat-box mine">{data.prompt}</span>
							</div>
							<div className="line">
								<span className="chat-box">{data.res}</span>
							</div>
						</>
					))
				}
			</div>

			<form>
				<input type="text" placeholder="입력하세요." value={value} onChange={(e) => {
					setValue(e.target.value);
				}} />
				<button onClick={(e) => {
					e.preventDefault();

					openai.createCompletion({
						model: "text-davinci-003",
						prompt: value,
						temperature: 0.7,
						max_tokens: 100,
						top_p: 1,
						frequency_penalty: 0,
						presence_penalty: 0,
					}).then((result) => {
						//console.log(result.data.choices[0].text);
						const chat = {
							prompt: value,
							res: result.data.choices[0].text
						}

						const copy = [...msg]
						copy.push(chat)
						setMsg(copy)
						setValue('');

					});

				}} disabled={!value}>전송</button>
			</form>

		</div>
	);
}

function UserMsg({ value }) {
	return (
		<div className="line">
			<span className="chat-box">{value}</span>
		</div>
	)
}

export default App;
