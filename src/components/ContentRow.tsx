import React, { useEffect, useState } from "react";
import { ENDPOINTS } from "../common/endpoints";
import fetchRequest, { MovieResponse, MovieResult } from "../common/api";

function ContentRow({ endpoint, title }: { endpoint: string; title: string }) {
  const [rowData, setrowData] = useState<MovieResult[]>([]);
  async function fetchMovies(endpoint: string) {
    const response = await fetchRequest<MovieResponse<MovieResult[]>>(endpoint);
    setrowData(response.results);
    console.log(response);
  }

  function getImageURL(poster_path: string) {
    console.log(`${import.meta.env.VITE_BASE_IMAGE_URL}${poster_path}`);

    return `${import.meta.env.VITE_BASE_IMAGE_URL}${poster_path}`;
  }

  useEffect(() => {
    fetchMovies(endpoint);
  }, []);

  return (
    <section>
        <h1 className="mb-4">{title}</h1>
      <section className="flex flex-nowrap overflow-x-auto">
        {rowData?.map((item) => {
          const { id, title, poster_path } = item;
          return (
            <section className="h-[200px] w-[200px] flex-none">
              <img
                className="h-full w-full object-contain"
                src={getImageURL(poster_path)}
                alt={title}
              ></img>
            </section>
          );
        })}
      </section>
    </section>
  );
}

export default ContentRow;
