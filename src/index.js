import React, { useState } from "react";
import ReactDOM from "react-dom";
import BooksPresenter from "./Books/BooksPresenter.js";

import "./styles.css";

function App() {
  const booksPresenter = new BooksPresenter();
  const [stateViewModel, copyViewModelToStateViewModel] = useState([]);
  const [reLoad, setReLoad] = useState(false);

  React.useEffect(() => {
    async function load() {
      await booksPresenter.load((viewModel) => {
        copyViewModelToStateViewModel(viewModel);
      });
    }
    load();
  }, [reLoad]);

  return (
    <>
      <h3>Books</h3>

      {/* for power up exercise */}
      <button type="button" onClick = { ()=>{
        booksPresenter.setMode("public") 
        setReLoad(!reLoad)
      }}>Public</button>
      <button type="button" onClick = { ()=> {
        booksPresenter.setMode("private");
        setReLoad(!reLoad)
      }}>Private</button>
      <br />
      <button type="button" onClick = { () => {
        booksPresenter.setSort("asc");
        setReLoad(!reLoad)
      }}>Sort on Name - ASC</button>
      <button type="button" onClick = { () => {
        booksPresenter.setSort("desc");
        setReLoad(!reLoad)
      }}>Sort on Name - DESC</button>
      <br />

      <div>
        {stateViewModel.map((book, i) => {
          return <div key={i}>{book.name}</div>;
        })}
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
