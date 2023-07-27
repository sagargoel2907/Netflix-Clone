import React, { useEffect } from "react";
import fetchRequest, { MovieResponse, MovieResult } from "../common/api";
import { ENDPOINTS } from "../common/endpoints";
import ContentRow from "../components/ContentRow";
import Banner from "../components/Banner";

function Browse() {
  return (
    <section>
      <Banner />
      <ContentRow
        endpoint={ENDPOINTS.MOVIES_POPULAR}
        title="Popular"
        key="popular"
      />
      <ContentRow endpoint={ENDPOINTS.MOVIES_NOW_PLAYING} title="Now Playing" />
      <ContentRow endpoint={ENDPOINTS.MOVIES_TOP_RATED} title="Top Rated" />
    </section>
  );
}

export default Browse;
