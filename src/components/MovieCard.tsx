import { useEffect, useRef, useState } from "react";
import { getImageURL } from "../common/utils";
import Modal from "./Modal";
import fetchRequest from "../common/api";
import { ENDPOINTS } from "../common/endpoints";
const CARD_WIDTH = 200;
type MovieCardProp = {
  id: number;
  poster_path: string;
  title: string;
};

export type MovieVideoInfo<T> = {
  id: number;
  results: T[];
};

export type MovieVideoResult = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

function MovieCard({ id, poster_path, title }: MovieCardProp) {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLSelectElement | null>(null);
  const [videoId, setvideoId] = useState("");
  async function onMouseIn() {
    await fetchVideoInfo();
    setIsOpen(true);
  }
  function onMouseOut() {
    setIsOpen(false);
  }
  async function fetchVideoInfo() {
    const response = await fetchRequest<MovieVideoInfo<MovieVideoResult>>(
      ENDPOINTS.MOVIES_VIDEO.replace("{movie_id}", id.toString())
    );
    setvideoId(response.results[0].key);
  }
  useEffect(() => {
    cardRef.current?.addEventListener("mouseenter", onMouseIn);
    return () => cardRef.current?.removeEventListener("mouseenter", onMouseIn);
  }, []);

  return (
    <>
      <section
        ref={cardRef}
        className="h-[200px] w-[200px] flex-none aspect-square"
        key={id}
      >
        <img
          loading="eager"
          className="h-full w-full object-contain rounded-lg"
          src={
            getImageURL(poster_path)
            // "https://th.bing.com/th/id/OIP.MdXVNCgYOzm_2VbkDFO1-gAAAA?pid=ImgDet&rs=1"
          }
          alt={title}
        ></img>
      </section>
      <Modal
        isOpen={isOpen}
        onClose={onMouseOut}
        title={title}
        videoID={videoId}
      >
        <h1>Hi dudes</h1>
      </Modal>
    </>
  );
}

export default MovieCard;
