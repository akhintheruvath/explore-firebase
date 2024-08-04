import { collection, getDocs } from 'firebase/firestore';
import './App.css';
import { Auth } from './components/Auth';
import { db } from './config/config';
import { useEffect, useMemo, useState } from 'react';

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = useMemo(() => collection(db, "movies"), [db]);

  useEffect(() => {
    getMoviesList();
  }, []);
  
  const getMoviesList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const docs = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMovieList(docs);
    } catch (err) {
      console.log("Error occured while feching documents: ", err);
    }
  }
  
  return (
    <div className="App">
      <Auth />
      <div>
        {
          movieList.map(movie => (
            <div>
              <h2>Movie: {movie.title}</h2>
              <p>Release Date: {movie.releaseDate}</p>
              <p>Oscar Received : {movie.receivedOscar ? "Yes" : "No"}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
