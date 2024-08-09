const API_KEY = '45358562-a6f601b45a643dd81cb1b87d3';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
      query
    )}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }
  const data = await response.json();
  return data.hits;
}
