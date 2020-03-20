import React, { useState, useRef, useCallback } from "react";
import Header from "../../components/Header";
import CharacterCard from "../../components/CharacterCard";
import useCharactersLoad from "../../components/useCharactersLoad";
import "./styles.css";

const Main = () => {
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { charactersList, hasMore, loading } = useCharactersLoad(
    searchText,
    pageNumber
  );
  const observer = useRef();
  const lastElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(e) {
    setSearchText(e.target.value);
    setPageNumber(1);
  }

  return (
    <>
      <Header handleSearch={handleSearch} />
      <div className="row p-0 mx-auto" style={{ marginTop: "70px" }}>
        {charactersList &&
          charactersList.map((character, idx) => {
            if (charactersList.length === idx + 1) {
              return (
                <div
                  className="col-lg-3 col-md-3 col-sm-12 col-xs-12 p-3"
                  key={idx}
                >
                  <CharacterCard character={character} />
                  <div
                    className="bg-transparent p-0 m-0 h-0"
                    ref={lastElementRef}
                  ></div>
                </div>
              );
            } else {
              return (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3"
                  key={idx}
                >
                  <CharacterCard character={character} />
                </div>
              );
            }
          })}
        <div className="col-12 p-0 m-3 mx-auto">
          {loading && (
            <div className="col-12 text-center loading">Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
