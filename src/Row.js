import React, { useEffect, useState } from 'react';
import axios from './axios';
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const baseURL = "https://images.tmdb.org/t/p/original/";
function Row({title, fetchUrl, isLargeRow}){
  const [movies, setMovies] = useState([]);
  const [trailerURL, setTrailerURL] = useState("");

  useEffect(()=>{
    async function fetchData(){
      const request = await axios.get(fetchUrl);
      // console.log(request);
      setMovies(request.data.results)
      return  request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay:1
    }
  }

  const handleClick = (movie)=>{
    if (trailerURL) {
      setTrailerURL('');
    } else {
      console.log("Inside else");
      movieTrailer(movie?.name || "").then(url => {
        const urlParams = new URLSearchParams(new URL(url).search);
       setTrailerURL(urlParams.get('v'));
        }).catch(error=>{
          console.log(error);
        })
      }
  }
  // console.log(movies);

  return(
      <div className='row'>
      <h2>{ title }</h2>
      <div className='row__posters'>
        { movies.map((movies) => (
          <img
            className={ `row__poster ${isLargeRow && "row__posterLarge"}`}
            src={ `${baseURL}${isLargeRow?movies.poster_path:movies.backdrop_path}` }
            alt={ movies.name }
            key={ movies.id }
            onClick={()=>handleClick(movies)}
          />
        ))}
      </div>
      {trailerURL && <YouTube videoId={ trailerURL } opts={ opts} /> }
    </div>
  ) 
};

export default Row;
