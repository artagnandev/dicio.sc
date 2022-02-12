import { useState, useEffect } from 'react';

import './style.scss';

import { useParams } from 'react-router-dom';

import api from '../../services/api';

import slug from '../../services/slug'

import spinner from '../../img/spinner.gif';

import { 
  BsArrowLeft as IconArrowLeft,
} from "react-icons/bs";

import {
  FiEdit3 as IconEdit,
  FiX as IconRemove,
  FiPrinter as IconPrinter,
} from "react-icons/fi";

const Meanings = ( { match } ) => {
  const { word } = useParams();

  const [meanings, setMeanings] = useState([]);
  const [hasMeanings, setHasMeanings] = useState(false);
  const [loading, setLoading] = useState(true);

  const getMeanings = async (word) => {
    const { data } = await api.get(`/${word}`, (res) => res);
  
    data.word = word;

    setMeanings(data);
    setHasMeanings(true);
    setLoading(false);

    window.document.title = `DISCIO: ${word}`
  }

  const remove = (event) => event.target.parentElement.parentElement.classList.add('is-hide')

  const edit = (event) => {
    event.target
    .parentElement.parentElement
    .querySelector('.meaning-text')
    .toggleAttribute('contenteditable')

    event.target
    .parentElement.parentElement
    .classList.toggle('is-editable')
  } 

  const print = () => {
    window.document.title = `Significado de ${meanings.word}`

    window.print();
  }

  useEffect(() => {
    getMeanings(word)
  }, [word])

  return (
    <div className="meanings">
      {
        loading === true
        ? (
          <div className="spinner">
            <img src={spinner} alt="Loading..." className="spinner-gif" />
            <span className="spinner-text">Buscando significados...</span>
          </div>
        )

        : (

          <>
            <div className="actions">
              <a href="/" className="back" onClick={() => setHasMeanings(false)}>
                <IconArrowLeft />
              </a>

              <div>
                <button className="print" onClick={() => print()}>
                  <IconPrinter /> Imprimir
                </button>
                {/* <a href={window.location.pathname} target="_blank" className="show" rel="noreferrer">
                  <IconTv /> Jogar na tela
                </a> */}
              </div>
            </div>
          
            <h1 className="word"> {meanings.word} </h1>

            <div className="wrapper">
              {
                meanings !== []
                && meanings.map(meaning => (

                  <div key={meaning.class}>

                    {/* <h4 className="class"> {meaning.class} </h4>
                    <p className="etymology"> {meaning.etymology} </p> */}

                    <ul className="list">
                      {
                        meaning.meanings?.map(meaning => (
                          <li id={slug(meaning)} key={slug(meaning)} className="meaning">
                            <span className="meaning-text"> {meaning} </span>
                            <div className="meaning-actions">
                              <div 
                                title="Editar"
                                className="edit" 
                                onClick={(e) => edit(e)}
                              >
                                <IconEdit />
                              </div>
                              <div 
                                title="Remover"
                                className="remove"
                                onClick={(e) => remove(e)}
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
          </>

        )
      }
  </div>
  );
}

export default Meanings;