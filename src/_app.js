import api from './api';

function App() {
  const getMeaning = async () => {
    const data = await api.get('/teste');

    console.log(data)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          dicio.sc
        </h1>
        <input type="text" placeholder="Digite uma palavra" />
        <button
          className="App-link"
          onClick={getMeaning}
        >
          Buscar significado
        </button>
      </header>
    </div>
  );
}

export default App;
