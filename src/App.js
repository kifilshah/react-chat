
import './App.scss';

function App() {
	return (
		<div className="App">
			<div className="chat-content">
				<div className="line">
					<span className="chat-box">안녕?</span>
				</div>
				<div className="line">
					<span className="chat-box mine">안녕?</span>
				</div>
			</div>
			<input type="text" className="chat-box" id="input" />
			<button id="send">전송</button>
		</div>
	);
}

export default App;
