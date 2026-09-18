import { useState, useEffect } from 'react';
import { CharacterCard } from '../components/CharacterCard';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination';
import { ModalDetail } from '../components/ModalDetail';

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${search}`);
        if (!res.ok) throw new Error('No se encontraron personajes');
        const data = await res.json();
        setCharacters(data.results);
        setInfo(data.info);
      } catch (err) {
        setError(err.message);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page, search]);

  return (
    <div style={{ minHeight: '100vh', background: '#0f0c20', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#00ffcc', textAlign: 'center', textShadow: '0 0 10px #00ffcc' }}>
        Rick & Morty Explorer
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SearchBar search={search} setSearch={(val) => { setSearch(val); setPage(1); }} />
      </div>

      {loading && <p style={{ color: '#00ffcc', textAlign: 'center' }}>Cargando portal...</p>}
      {error && <p style={{ color: '#ff4d4d', textAlign: 'center' }}>{error}</p>}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {characters.map(char => (
          <CharacterCard key={char.id} character={char} onSelect={setSelectedCharacter} />
        ))}
      </div>

      {!loading && !error && <Pagination page={page} setPage={setPage} info={info} />}
      <ModalDetail character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
    </div>
  );
};