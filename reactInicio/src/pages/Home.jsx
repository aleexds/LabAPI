import { useState, useEffect } from 'react';
import { getCharacters } from '../services/rickAndMortyApi';
import { CharacterCard } from '../components/CharacterCard';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { Pagination } from '../components/Pagination';
import { ModalDetail } from '../components/ModalDetail';
import { PortalBackground } from '../components/PortalBackground';
import { FavoritesModal } from '../components/FavoritesModal';
import { useFavorites } from '../context/FavoritesContext';

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const { favorites } = useFavorites();

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCharacters(page, search, status, species);
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
  }, [page, search, status, species]);

  const handleFilterChange = (setter) => (val) => {
    setter(val);
    setPage(1);
  };

  return (
    <div style={{ padding: '30px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
      <PortalBackground />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button
          onClick={() => setIsFavoritesOpen(true)}
          style={{
            padding: '10px 18px',
            borderRadius: '20px',
            border: '2px solid #ff3366',
            background: 'rgba(26, 9, 51, 0.9)',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 0 10px rgba(255, 51, 102, 0.4)',
            transition: 'all 0.2s ease'
          }}
        >
          ❤️ Favoritos ({favorites.length})
        </button>
      </div>

      <h1 className="title-rick">Rick & Morty Multiverse</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SearchBar search={search} setSearch={handleFilterChange(setSearch)} />
      </div>

      <FilterBar 
        status={status} 
        setStatus={handleFilterChange(setStatus)} 
        species={species} 
        setSpecies={handleFilterChange(setSpecies)} 
      />

      {loading && (
        <p className="loading-portal" style={{ color: 'var(--neon-green)', textAlign: 'center', fontSize: '1.2rem' }}>
          🌀 Abriendo portal interdimensional...
        </p>
      )}

      {error && (
        <p style={{ color: '#ff3366', textAlign: 'center', fontSize: '1.1rem' }}>
          ⚠️ {error}
        </p>
      )}

      {/* La key dinámica activa la animación cardFadeIn al cambiar filtros */}
      <div 
        key={`${page}-${search}-${status}-${species}`}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '24px',
          margin: '30px 0'
        }}
      >
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} onSelect={setSelectedCharacter} />
        ))}
      </div>

      {!loading && !error && <Pagination page={page} setPage={setPage} info={info} />}
      
      <ModalDetail character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
      
      <FavoritesModal 
        isOpen={isFavoritesOpen} 
        onClose={() => setIsFavoritesOpen(false)} 
        onSelectCharacter={setSelectedCharacter} 
      />
    </div>
  );
};