import { useRef } from 'react';

import logo from '../../img/discio.svg';

import { BsSearch as IconSearch } from "react-icons/bs";

import "./style.scss";

function Home() {

  const inputRef = useRef(null);
  const formRef = useRef(null);

  const search = (word) => {
    formRef.current.action = `/${word}`
  }

  return (
    <div className="app">
      <div className="app__search">

        <img src={logo} alt="discio" class="app__search__logo" />

        <form action="" className="app__search__target" ref={formRef}>
          <input 
            type="text"
            ref={inputRef}
            placeholder="Digite uma palavra..." 
            className="app__search__target__input" 
          />

          <button className="app__search__target__button" onClick={(e) => search(inputRef.current.value, e)}>
            <IconSearch />
          </button>
        </form>

      </div>
    </div>
  );
}

export default Home;
