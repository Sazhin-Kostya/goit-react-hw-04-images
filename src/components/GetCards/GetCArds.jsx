import axios from 'axios';
export async function GetCards(query, page) {
  const resp = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=38435463-416309d9576d04c5aa9055e45&image_type=photo&orientation=horizontal&per_page=12`
  );
  return resp.data.hits;
}
