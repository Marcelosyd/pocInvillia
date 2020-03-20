import { useEffect, useState } from "react";
import axios from "axios";

export default function useCharactersLoad(searchText, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [charactersList, setCharactersList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setCharactersList([]);
  }, [searchText]);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios({
      method: "GET",
      url: "https://swapi.co/api/people",
      params: { search: searchText, page: pageNumber },
      cancelToken: new axios.CancelToken(c => (cancel = c))
    })
      .then(res => {
        setCharactersList(prevCharactersList => {
          //console.log(res.data.results);
          return [...prevCharactersList, ...res.data.results];
        });
        //console.log(charactersList);
        setHasMore(res.data.next);
        setLoading(false);
      })
      .catch(e => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
  }, [searchText, pageNumber]);

  return { loading, charactersList, hasMore };
}
