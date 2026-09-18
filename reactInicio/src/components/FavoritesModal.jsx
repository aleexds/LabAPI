
import { useFavorites } from '../context/FavoritesContext';
import { CharacterCard } from './CharacterCard';

export const FavoritesModal = ({ isOpen, onClose, onSelectCharacter }) => {
  const { favorites } = useFavorites();

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(11, 3, 20, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: 'var(--card-bg)',
        border: '2px solid var(--neon-green)',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '900px',
        maxHeight: '80vh',
        overflowY: 'auto',
        padding: '24px',
        boxShadow: '0 0 30px rgba(0, 255, 136, 0.4)'
      }} onClick={(e) => e.stopPropagation()}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: 'var(--neon-green)', margin: 0 }}>
            ❤️ Mis Personajes Favoritos ({favorites.length})
          </h2>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ✖
          </button>
        </div>

        {favorites.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#b8c0ec', padding: '40px 0' }}>
            Aún no has agregado ningún personaje a tus favoritos. ¡Toca el corazón ❤️ en una tarjeta!
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {favorites.map((char) => (
              <CharacterCard 
                key={char.id} 
                character={char} 
                onSelect={(character) => {
                  onClose();
                  onSelectCharacter(character);
                }} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};