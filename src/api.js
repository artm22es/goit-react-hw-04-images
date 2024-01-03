import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '39083023-6bd2967288a0046d4cd8dec4e';

export const getImageByQuery = async (query, page) => {
  const params = new URLSearchParams({
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 12,
  });
  const key = `?key=${API_KEY}`;

  const images = await axios.get(key, { params });
  return images.data;
};
