export function getImageURL(poster_path: string, width: number) {
  console.log(`${import.meta.env.VITE_BASE_IMAGE_URL}${poster_path}`);
  return `${import.meta.env.VITE_BASE_IMAGE_URL}/w${width}${poster_path}`;
}
