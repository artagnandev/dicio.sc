import api from './api';

function App() {

  const getMeaning = async () => {
    const data = await api.get('/palavra');

    console.log(data)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          dicio.sc
        </h1>
        <button
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={getMeaning}
        >
          Buscar palavra
        </button>
      </header>
    </div>
  );
}

export default App;
