import { getImageURL } from "../common/utils";
const CARD_WIDTH = 200;

function MovieCard({
  id,
  poster_path,
  title,
}: {
  id: number;
  poster_path: string;
  title: string;
}) {
  return (
    <section className="h-[200px] w-[200px] flex-none aspect-square" key={id}>
      <img
        loading="eager"
        className="h-full w-full object-contain rounded-lg"
        src={
          //   getImageURL(poster_path, CARD_WIDTH)
          "https://th.bing.com/th/id/OIP.MdXVNCgYOzm_2VbkDFO1-gAAAA?pid=ImgDet&rs=1"
        }
        alt={title}
      ></img>
    </section>
  );
}

export default MovieCard;
