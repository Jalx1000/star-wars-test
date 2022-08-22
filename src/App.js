import "./App.css";
import data from './data.json'

function App() {
  return (
    <ul>
      {data.results.map(charater=>{
        return <li key={charater.name}>{charater.name}</li>
      })}
    </ul>
  );
}

export default App;
