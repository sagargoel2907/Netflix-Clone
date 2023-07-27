import { useEffect, useRef, useState } from "react";
import { getImageURL } from "../common/utils";
import Youtube from "react-youtube";
import Modal from "./Modal";
import fetchRequest, { fetchVideoInfo } from "../common/api";
import { ENDPOINTS } from "../common/endpoints";
import LikeIcon from "@heroicons/react/24/outline/HandThumbUpIcon";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import PlayIcon from "@heroicons/react/24/solid/PlayIcon";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import { Position } from "../common/types";
import { Card } from "@mui/material";

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
  const [videoInfo, setVideoInfo] = useState<MovieVideoResult | null>(null);
  const [position, setposition] = useState<Position>({ top: 0, left: 0 });
  const [hidePoster, sethidePoster] = useState(false);
  async function onMouseIn() {
    const [videoResult] = await fetchVideoInfo(id);
    setVideoInfo(videoResult);
    console.log(videoResult);

    const rectangle = cardRef.current?.getBoundingClientRect();
    let top = (rectangle?.top ?? 0) - 100;
    let left = (rectangle?.left ?? 0) - 100;
    if (left <= 0) {
      left = 50;
    }
    if (top <= 0) {
      top = 50;
    }
    if (left + 450 > document.body.clientWidth) {
      left -= left + 450 - document.body.clientWidth;
    }
    if (top + 450 > window.innerHeight) {
      top -= top + 450 - window.innerHeight;
    }

    setposition({ top, left });
    setIsOpen(true);
  }
  function onMouseOut() {
    setIsOpen(false);
  }

  useEffect(() => {
    cardRef.current?.addEventListener("mouseenter", onMouseIn);
    return () => cardRef.current?.removeEventListener("mouseenter", onMouseIn);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (videoInfo?.key && isOpen) {
        sethidePoster(true);
      }
    }, 1000);

    setTimeout(() => {
      if (!isOpen) {
        console.log(isOpen);
        sethidePoster(false);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [isOpen, videoInfo]);

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
            getImageURL(poster_path, CARD_WIDTH)
            // "https://th.bing.com/th/id/OIP.MdXVNCgYOzm_2VbkDFO1-gAAAA?pid=ImgDet&rs=1"
          }
          alt={title}
        ></img>
      </section>
      <Modal
        isOpen={isOpen}
        onClose={onMouseOut}
        title={title}
        position={position}
      >
        <section className=" w-[400px] h-[400px] py-2">
          {!hidePoster ? (
            <img
              src={
                getImageURL(poster_path, 400)
                // "https://th.bing.com/th/id/OIP.MdXVNCgYOzm_2VbkDFO1-gAAAA?pid=ImgDet&rs=1"
              }
              alt={title}
              className="h-full w-full rounded-t-lg"
            />
          ) : (
            <Youtube
              videoId={videoInfo?.key ?? ""}
              opts={{
                height: "400",
                width: "400",
                playerVars: {
                  // https://developers.google.com/youtube/player_parameters
                  autoplay: 1,
                  playsinline: 1,
                  controls: 0,
                },
              }}
            />
          )}
          <section className="py-4 px-4 flex justify-between gap-4 ">
            <ul className="flex gap-2 justify-center">
              <li className="h-6 w-6">
                <button className="h-full w-full border-2 rounded-full p-1 hover:text-white text-gray-200 border-gray-200 hover:border-white">
                  <PlayIcon />
                </button>
              </li>
              <li className="h-6 w-6">
                <button className="h-full w-full border-2 rounded-full p-1 hover:text-white text-gray-200 border-gray-200 hover:border-white">
                  <PlusIcon />
                </button>
              </li>
              <li className="h-6 w-6">
                <button className="h-full w-full border-2 rounded-full p-1 hover:text-white text-gray-200 border-gray-200 hover:border-white">
                  <LikeIcon />
                </button>
              </li>
            </ul>
            <ul>
              <li className="h-6 w-6">
                <button className="h-full w-full border-2 rounded-full p-1  hover:text-white text-gray-200 border-gray-200 hover:border-white">
                  <ChevronDownIcon />
                </button>
              </li>
            </ul>
          </section>
        </section>
      </Modal>
    </>
  );
}

export default MovieCard;
