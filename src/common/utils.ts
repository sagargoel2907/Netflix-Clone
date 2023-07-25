export function getImageURL(poster_path: string) {
  const url = `${import.meta.env.VITE_BASE_IMAGE_URL}${poster_path}`;
  console.log(url);
  return url;
}
