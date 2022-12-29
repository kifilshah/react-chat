import { useState } from 'react';
import './App.scss';
import { Configuration, OpenAIApi } from "openai";
//import { Configuration, OpenAIApi } from 'https://cdn.skypack.dev/openai';

//console.log(process.env.REACT_APP_API_KEY);

function App() {
	const [value, setValue] = useState('');
	const [chat, setChat] = useState([]);

	return (
		<div className="App">
			<div className="chat-content">
				<div className="line">
					<span className="chat-box">안녕?</span>
				</div>
				{/* <div className="line">
					<span className="chat-box mine">안녕?</span>
				</div> */}
				{
					chat.map((data, i) => (
						<div className="line" key={i}>
							<span className="chat-box mine">{data}</span>
						</div>
					))
				}
			</div>

			<form>
				<input type="text" placeholder="입력하세요." value={value} onChange={(e) => {
					setValue(e.target.value);
				}} />
				<button onClick={(e) => {
					e.preventDefault();
					const copy = [...chat];
					copy.push(value);
					setChat(copy);
					setValue('');


					const configuration = new Configuration({
						apiKey: process.env.REACT_APP_API_KEY,
					});
					const openai = new OpenAIApi(configuration);

					openai.createCompletion({
						model: "text-davinci-003",
						prompt: { value },
						temperature: 0.7,
						max_tokens: 100,
						top_p: 1,
						frequency_penalty: 0,
						presence_penalty: 0,
					}).then((result) => {
						console.log(result.data.choices[0].text);
					});

				}} disabled={!value}>전송</button>
			</form>
		</div>
	);
}

export default App;
