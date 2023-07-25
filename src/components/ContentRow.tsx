import React, { useEffect, useRef, useState } from "react";
import fetchRequest, { MovieResponse, MovieResult } from "../common/api";
import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";
import ChevronLeftIcon from "@heroicons/react/24/outline/ChevronLeftIcon";
import PageIndicator from "./PageIndicator";
import MovieCard from "./MovieCard";
const CARD_WIDTH = 200;

function ContentRow({ endpoint, title }: { endpoint: string; title: string }) {
  const [rowData, setrowData] = useState<MovieResult[]>([]);
  const sliderRef = useRef<HTMLSelectElement>(null);
  const containerRef = useRef<HTMLSelectElement>(null);
  const cardsPerPage = useRef(0);
  const pageCount = useRef(0);
  const [translateX, setTranslateX] = useState(0);
  const [currentPage, setcurrentPage] = useState(0);
  const disablePrev = currentPage == 0;
  const disableNext = currentPage + 1 == pageCount.current;

  async function fetchMovies(endpoint: string) {
    const response = await fetchRequest<MovieResponse<MovieResult[]>>(endpoint);
    setrowData(response.results);
  }

  function onPrevClick() {
    if (sliderRef.current) {
      const updatedTranslateX = translateX + getTranslateXValue();
      sliderRef.current.style.transform = `translateX(${updatedTranslateX}%)`;
      setTranslateX(updatedTranslateX);
      setcurrentPage(currentPage - 1);
    }
  }

  function onNextClick() {
    if (sliderRef.current) {
      const updatedTranslateX = translateX - getTranslateXValue();
      sliderRef.current.style.transform = `translateX(${updatedTranslateX}%)`;
      setTranslateX(updatedTranslateX);
      setcurrentPage(currentPage + 1);
    }
  }

  function getTranslateXValue() {
    let translateX = 0;
    if (sliderRef.current) {
      translateX =
        ((cardsPerPage.current * CARD_WIDTH) / sliderRef.current.clientWidth) *
        100;
    }
    return translateX;
  }

  useEffect(() => {
    fetchMovies(endpoint);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      cardsPerPage.current = Math.floor(
        containerRef.current?.clientWidth / CARD_WIDTH
      );
      pageCount.current = Math.ceil(rowData.length / cardsPerPage.current);
    }
  }, [rowData.length]);

  return (
    <section className="row-container px-4">
      <h1 className="mb-4">{title}</h1>

      <PageIndicator
        currentPage={currentPage}
        pageCount={pageCount.current}
        className="justify-end mb-4 opacity-0"
      />

      <section
        ref={containerRef}
        className="relative flex flex-nowrap overflow-x-hidden gap-2"
      >
        {!disablePrev ? (
          <button
            className="h-full w-8 absolute z-[5] bg-black/25 opacity-0 rounded-l-lg"
            onClick={onPrevClick}
          >
            <ChevronLeftIcon />
          </button>
        ) : null}
        {!disableNext ? (
          <button
            className="h-full w-8 absolute right-0 z-[5]  bg-black/25 opacity-0 rounded-r-lg"
            onClick={onNextClick}
          >
            <ChevronRightIcon />
          </button>
        ) : null}
        <section
          ref={sliderRef}
          className="flex overflow-x-visible gap-2 transition-transform duration-1000 ease-in-out"
        >
          {rowData?.map((item) => {
            const { id, title, poster_path } = item;
            return <MovieCard {...item} />;
          })}
        </section>
      </section>
    </section>
  );
}

export default ContentRow;
