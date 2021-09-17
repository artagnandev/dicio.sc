import './style.scss';

const Show = ({ word, meanings }) => {
  return (
    <>
      <h1>{ word }</h1>

      {
        meanings.map(meaning => <li key={Math.random(0.5)}>{meaning}</li>)
      }
    </>
  );
}

export default Show;