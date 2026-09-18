import { useState, useEffect } from 'react';
import { getCharacters } from '../services/rickAndMortyApi';
import { CharacterCard } from '../components/CharacterCard';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar'; // 👈 Importamos los filtros
import { Pagination } from '../components/Pagination';
import { ModalDetail } from '../components/ModalDetail';
<<<<<<< HEAD
=======
import { PortalBackground } from '../components/PortalBackground';
>>>>>>> d76dc42199333fd44e8851efa2d1f36aa31861c8

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(''); // 👈 Estado de filtro
  const [species, setSpecies] = useState(''); // 👈 Estado de filtro
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
<<<<<<< HEAD
        const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${search}`);
        if (!res.ok) throw new Error('No se encontraron personajes');
        const data = await res.json();
=======
        const data = await getCharacters(page, search, status, species);
>>>>>>> d76dc42199333fd44e8851efa2d1f36aa31861c8
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
  }, [page, search, status, species]); // 👈 Re-ejecuta al cambiar cualquier filtro

  const handleFilterChange = (setter) => (val) => {
    setter(val);
    setPage(1); // Reinicia a la página 1 cuando se aplique un filtro
  };

  return (
<<<<<<< HEAD
    <div style={{ minHeight: '100vh', background: '#0f0c20', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#00ffcc', textAlign: 'center', textShadow: '0 0 10px #00ffcc' }}>
        Rick & Morty Explorer
      </h1>
=======
    <div style={{ padding: '30px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
      <PortalBackground />

      <h1 className="title-rick">Rick & Morty Multiverse</h1>
      
>>>>>>> d76dc42199333fd44e8851efa2d1f36aa31861c8
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SearchBar search={search} setSearch={handleFilterChange(setSearch)} />
      </div>

<<<<<<< HEAD
      {loading && <p style={{ color: '#00ffcc', textAlign: 'center' }}>Cargando portal...</p>}
      {error && <p style={{ color: '#ff4d4d', textAlign: 'center' }}>{error}</p>}
=======
      {/* Barra de Filtros por Estado y Especie */}
      <FilterBar 
        status={status} 
        setStatus={handleFilterChange(setStatus)} 
        species={species} 
        setSpecies={handleFilterChange(setSpecies)} 
      />

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
>>>>>>> d76dc42199333fd44e8851efa2d1f36aa31861c8

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