import { useState } from 'react';
import './App.scss';
import { Configuration, OpenAIApi } from "openai";

function App() {
	const [value, setValue] = useState('');
	const [prompt, setPrompt] = useState([]);
	const [res, setRes] = useState([]);

	const [chatList, setChatList] = useState([]);

	const configuration = new Configuration({
		apiKey: process.env.REACT_APP_API_KEY,
	});
	const openai = new OpenAIApi(configuration);

	return (
		<div className="App">
			<div className="chat-content">
				{/* {
					prompt.map((data, i) => (
						<div className="line" key={i}>
							<span className="chat-box mine">{data}</span>
						</div>
					))
				}
				{
					res.map((data, i) => (
						<div className="line" key={i}>
							<span className="chat-box">{data}</span>
						</div>
					))
				} */}
			</div>
			{/*
			<form>
				<input type="text" placeholder="입력하세요." value={value} onChange={(e) => {
					setValue(e.target.value);
				}} />
				<button onClick={(e) => {
					e.preventDefault();
					const copy = [...prompt];
					copy.push(value);
					setPrompt(copy);
					setValue('');

					openai.createCompletion({
						model: "text-davinci-003",
						prompt: value,
						temperature: 0.7,
						max_tokens: 100,
						top_p: 1,
						frequency_penalty: 0,
						presence_penalty: 0,
					}).then((result) => {
						console.log(result.data.choices[0].text);
						const copy = [...res];
						copy.push(result.data.choices[0].text);
						setRes(copy);
					});

				}} disabled={!value}>전송</button>
			</form> */}
			{chatList}
			<form>
				<input type="text" placeholder="입력하세요." value={value} onChange={(e) => {
					setValue(e.target.value);
					const copy = [...prompt];
					copy.push(value);
					setPrompt(copy);
					// setValue('');
				}} />
				<button onClick={(e) => {
					e.preventDefault();
					//setChatList(chatList.concat(<UserMsg prompt={prompt} />));

				}}>전송</button>
			</form>
		</div>
	);
}

function UserMsg({ prompt }) {
	return (
		<div className="line">
			<span className="chat-box">{prompt}</span>
		</div>
	)
}

export default App;
