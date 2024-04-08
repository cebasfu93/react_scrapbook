import './App.css';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to see changes.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* renders [1,2,3] */}
        <p>[1,2,3]</p>
        {/* renders 123 */}
        <p>{[1, 2, 3]}</p>
        {/* doesnt render anything */}
        <p>{2 === false}</p>
      </header>
    </div>
  );
}

export default App;
