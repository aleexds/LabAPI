const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (page = 1, name = '', status = '', species = '') => {
  const response = await fetch(
    `${BASE_URL}/character/?page=${page}&name=${name}&status=${status}&species=${species}`
  );
  if (!response.ok) {
    throw new Error('No se encontraron personajes con los filtros seleccionados');
  }
  return await response.json();
};

export const getEpisodeByUrl = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error al obtener el episodio');
  }
  return await response.json();
};