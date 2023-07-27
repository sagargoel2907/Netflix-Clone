import React, { useEffect, useState } from "react";
import fetchRequest, {
  MovieResponse,
  MovieResult,
  fetchVideoInfo,
} from "../common/api";
import { ENDPOINTS } from "../common/endpoints";
import { getImageURL } from "../common/utils";
import Youtube, { YouTubeEvent } from "react-youtube";
import { MovieVideoResult } from "./MovieCard";

function Banner() {
  const [randomMovie, setrandomMovie] = useState<MovieResult | null>(null);
  const [videoInfo, setVideoInfo] = useState<MovieVideoResult | null>(null);
  const [hidePoster, sethidePoster] = useState(false);
  const [showBackDrop, setshowBackDrop] = useState(true);
  async function fetchPopularMovies() {
    const response = await fetchRequest<MovieResponse<MovieResult[]>>(
      ENDPOINTS.MOVIES_POPULAR
    );
    const filteredMovies = response.results.filter(
      (movie) => movie.backdrop_path
    );
    const randomMovie =
      filteredMovies[Math.floor(Math.random() * (filteredMovies.length - 1))];
    setrandomMovie(randomMovie);
    const [videoResult] = await fetchVideoInfo(randomMovie.id);
    setVideoInfo(videoResult);
    console.log(randomMovie);
  }

  useEffect(() => {
    fetchPopularMovies();
    setTimeout(() => {
      sethidePoster(true);
    }, 2000);
  }, []);

  function onStateChange(event: YouTubeEvent<number>) {
    if (event.data == 0) {
      sethidePoster(false);
      setshowBackDrop(true);
    } else if (event.data == 1) {
      sethidePoster(true);
    }
  }

  return (
    <section
      style={{
        width: "100%",
        height: "800px",
      }}
      className="overflow-x-hidden relative"
    >
      {!hidePoster ? (
        <img
          src={
            getImageURL(randomMovie?.poster_path ?? "")
            // "https://th.bing.com/th/id/OIP.MdXVNCgYOzm_2VbkDFO1-gAAAA?pid=ImgDet&rs=1"
          }
          alt={randomMovie?.title}
          className="h-full w-full rounded-t-lg object-contain"
        />
      ) : (
        <Youtube
          videoId={videoInfo?.key ?? ""}
          opts={{
            width: "100%",
            height: "800px",
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          }}
          className="-mt-14"
          onStateChange={onStateChange}
        />
      )}
      {showBackDrop ? (
        <section className="absolute top-0 left-0 w-full h-full bg-dark/60"></section>
      ) : null}
      <section className="absolute left-8 bottom-8 flex flex-col gap-2">
        <h2 className="text-6xl">{randomMovie?.title}</h2>
        <p className="line-clamp-3 text-sm">{randomMovie?.overview}</p>
        <section className="flex gap-2">
          <button className="bg-white text-dark p-1 rounded-md">Play</button>
          <button className="bg-white text-dark p-1 rounded-md">
            More info
          </button>
        </section>
      </section>
    </section>
  );
}

export default Banner;
