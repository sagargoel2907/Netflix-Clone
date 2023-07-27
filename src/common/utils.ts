type dimension = 200 | 400 | "original";

export function getImageURL(
  poster_path: string,
  dimension: dimension = "original"
) {
  if (dimension !== "original") {
    return `${import.meta.env.VITE_BASE_IMAGE_URL}w${dimension}${poster_path}`;
  } else {
    return `${import.meta.env.VITE_BASE_IMAGE_URL}${dimension}${poster_path}`;
  }
}
