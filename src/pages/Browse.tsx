import React, { useEffect } from "react";
import fetchRequest, { MovieResponse, MovieResult } from "../common/api";
import { ENDPOINTS } from "../common/endpoints";

function Browse() {
  async function fetchPopularMovies(){
    const popularMovies=await fetchRequest<MovieResponse<MovieResult>>(ENDPOINTS.MOVIES_POPULAR);
    console.log(popularMovies);
  }

  useEffect(()=>{
    fetchPopularMovies();
  },[]);

  return (
    <section>
      <section>Banner Image</section>
      <section className="row">row</section>
    </section>
  );
}

export default Browse;
