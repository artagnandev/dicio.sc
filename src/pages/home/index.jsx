import { useRef, useState } from 'react';

import discio from '../../img/discio.svg';

import { v4 as uuidv4 } from 'uuid';

import { 
  BsSearch as IconSearch, 
  BsArrowLeft as IconArrowLeft,
} from "react-icons/bs";

import {
  FiEdit3 as IconEdit,
  FiX as IconRemove,
  FiPrinter as IconPrinter,
  FiTv as IconTv
} from "react-icons/fi";

import api from '../../services/api';
import slug from '../../services/slug';
import "./style.scss";

function Home() {

  const inputRef = useRef(null);

  const [meanings, setMeanings] = useState([]);
  const [hasMeanings, setHasMeanings] = useState(false);
  const [loading, setLoading] = useState(false);

  const getMeaning = async (word) => {
    setLoading(true)

    const { data } = await api.get(`/${word}`, (res) => res);

    data.word = word;

    setMeanings(data);
    setHasMeanings(true);
    setLoading(false);

    window.document.title = `DISCIO: Significado de ${word}`
  }

  const hidden = (event) => event.target.parentElement.parentElement.classList.add('hidden')

  const edit = (event) => {
    event.target
    .parentElement.parentElement
    .querySelector('.item__meaning')
    .toggleAttribute('contenteditable')

    event.target
    .parentElement.parentElement
    .classList.toggle('is-editable')
  } 

  const print = () => {
    window.document.title = `Significado de ${meanings.word}`

    window.print();
  }

  return (
    <div className="app">
      { 
        !hasMeanings
          ? (
            <div className="app__search">
              <img src={discio} alt="discio" />
              <div className="app__search__target">
                <input 
                  type="text"
                  ref={inputRef}
                  placeholder="Pesquise uma palavra" 
                  className="app__search__target--input" 
                />

                <button 
                  className="app__search__target--button" 
                  onClick={() => getMeaning(inputRef.current.value)}
                >
                  <IconSearch />
                </button>
              </div>
              <span className={`app__search__load ${loading && 'is-loading'}`}>
                Buscando significados...
              </span>
            </div>
          ) 
          : (
            <div className="app__meanings">
              <button class="app__meanings__actions">
                <button className="app__meanings__actions--back" onClick={() => setHasMeanings(false)}>
                  <IconArrowLeft />
                </button>

                <div>
                  <button className="app__meanings__actions--print" onClick={() => print()}>
                    <IconPrinter /> Imprimir
                  </button>
                  <button className="app__meanings__actions--screen">
                    <IconTv /> Jogar na tela
                  </button>
                </div>
              </button>
              
              <h1 className="app__meanings__word"> {meanings.word} </h1>
              <div className="app__meanings__list">
                {
                  meanings !== []
                  && meanings.map(item => (
                    <div key={item.class}>
                      {/* <h4 className="app__meanings__list--class"> {item.class} </h4>
                      <p className="app__meanings__list--etymology"> {item.etymology} </p> */}
      
                      <ul className="app__meanings__list__items">
                        {
                          item.meanings?.map(meaning => (
                            <li id={slug(meaning)} key={slug(meaning)} className="item">
                              <span className="item__meaning"> {meaning} </span>
                              <div className="item__actions">
                                <div 
                                  title="Editar"
                                  className="item__actions--edit" 
                                  onClick={(e) => edit(e)}
                                >
                                  <IconEdit />
                                </div>
                                <div 
                                  title="Remover"
                                  className="item__actions--remove"
                                  onClick={(e) => hidden(e)}
                                >
                                  <IconRemove />
                                </div>
                              </div>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  ))
                }
              </div>       
            </div>
          )
      }
    </div>
  );
}

export default Home;
