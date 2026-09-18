import { useState, useEffect } from 'react';
import { getCharacters } from '../services/rickAndMortyApi';
import { CharacterCard } from '../components/CharacterCard';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination';
import { ModalDetail } from '../components/ModalDetail';
import { PortalBackground } from '../components/PortalBackground'; // 👈 Se importa el fondo

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
        const data = await getCharacters(page, search);
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
    <div style={{ padding: '30px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
      {/* Canvas animado del portal al fondo */}
      <PortalBackground />

      <h1 className="title-rick">Rick & Morty Multiverse</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SearchBar search={search} setSearch={(val) => { setSearch(val); setPage(1); }} />
      </div>

      {loading && (
        <p style={{ color: 'var(--neon-green)', textAlign: 'center', fontSize: '1.2rem' }}>
          🌀 Abriendo portal interdimensional...
        </p>
      )}

      {error && (
        <p style={{ color: '#ff3366', textAlign: 'center', fontSize: '1.1rem' }}>
          ⚠️ {error}
        </p>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '24px',
        margin: '30px 0'
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