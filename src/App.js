import { useState, useEffect, useRef } from "react";
import { getCharacter, getPeople, searchCharacter } from "./api/people";
import "./App.css";

function App() {
  const inputSearch = useRef();
  const [textSearch, setTextSearch] = useState("");
  const [people, setPeople] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(1);
  const [details, setDetails] = useState({});
  const [page, setPage] = useState(1)
  const [errorState, setErrorState] = useState({ hasError: false });

  useEffect(() => {
    getPeople(page).then(setPeople).catch(handleError);
  }, [page]);

  useEffect(() => {
    getCharacter(currentCharacter).then(setDetails).catch(handleError);
  }, [currentCharacter]);

  const handleError = (err) => {
    setErrorState({ hasError: true, message: err.message });
  };

  const showDetails = (character) => {
    const id = Number(character.url.split("/").slice(-2)[0]);
    setCurrentCharacter(id);
  };

  const onChangeTextSearch = (e) => {
    e.preventDefault();
    const text = inputSearch.current.value;
    setTextSearch(text);
  };

  const onSearchSubmit = (e) => {
    if (e.key !== "Enter") return;

    inputSearch.current.value = "";
    setDetails({});
    searchCharacter(textSearch)
      .then(setPeople)
      .catch(handleError);
  };

  const onChangePage = (next)=>{
    if(!people.previous && page + next <=0 ) return;
    if(!people.next && page + next>=9) return;
    setPage(page+next)
  }

  return (
    <div>
      <input
        ref={inputSearch}
        onChange={onChangeTextSearch}
        onKeyDown={onSearchSubmit}
        type="text"
        placeholder="Buscar un personaje"
      />
      <ul>
        {errorState.hasError && <>{errorState.message}</>}
        {people?.results?.map((charater) => {
          return (
            <li key={charater.name} onClick={() => showDetails(charater)}>
              {charater.name}
            </li>
          );
        })}
      </ul>

      <section>
        <button onClick={()=>onChangePage(-1)}>Prev</button>
        | {page} |
        <button onClick={()=>onChangePage(1)}>Next</button>
      </section>

      {details && (
        <aside>
          <h1>{details.name}</h1>
          <ul>
            <li>height: {details.height}</li>
            <li>mass: {details.mass}</li>
            <li>Year of Birth: {details.birth_year}</li>
          </ul>
        </aside>
      )}
    </div>
  );
}

export default App;
