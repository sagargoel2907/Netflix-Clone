import { useEffect, useRef, useState } from "react";
import { getImageURL } from "../common/utils";
import Modal from "./Modal";
const CARD_WIDTH = 200;
type MovieCardProp = {
  id: number;
  poster_path: string;
  title: string;
};

function MovieCard({ id, poster_path, title }: MovieCardProp) {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLSelectElement | null>(null);
  function onMouseIn() {
    setIsOpen(true);
  }
  function onMouseOut() {
    setIsOpen(false);
  }

  useEffect(() => {
    cardRef.current?.addEventListener("mouseenter", onMouseIn);
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
            getImageURL(poster_path, CARD_WIDTH)
            // "https://th.bing.com/th/id/OIP.MdXVNCgYOzm_2VbkDFO1-gAAAA?pid=ImgDet&rs=1"
          }
          alt={title}
        ></img>
      </section>
      <Modal isOpen={isOpen} onClose={onMouseOut} title={title}>
        <h1>Hi dudes</h1>
      </Modal>
    </>
  );
}

export default MovieCard;
