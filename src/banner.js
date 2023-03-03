import React,  {useState, useEffect} from 'react'
import axios from './axios';
import requests from './request';
import './banner.css';
export default function Banner() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {

        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovies(request.data.results[Math.floor(Math.random()* request.data.results.length-1)])
            // console.log(request.data.results);
            
            return request;
        }
        fetchData(); 
    }, []);

    console.log(movies);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

  return (
      <header className='banner'
      
      style={{
          backgroundSize: "cover",
          backgroundImage: `url(
              "https://image.tmdb.org/t/p/original/${movies?.backdrop_path}"
          )`,
          backgroundPosition: "center center",
          } }
      >
          <div className='banner__contents'>
              <h1 className='banner__title'>{ movies?.title || movies?.name || movies?.original_name }</h1>
              <div className='banner__buttons'>
                      <button className='banner__button'>Play</button>
                      <button className='banner__button'>My List</button>
            </div>

              <h1 className='banner__description'>{ truncate(movies?.overview,150)}</h1>  
          </div>
          <div className='banner__fadeBottom'/>
      </header>
  )
}
