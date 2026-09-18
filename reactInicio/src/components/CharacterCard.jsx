
import { useFavorites } from '../context/useFavorites';

export const CharacterCard = ({ character, onSelect }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(character.id);

  const statusConfig = {
    Alive: { color: '#00ff88', icon: '🟢', label: 'Vivo' },
    Dead: { color: '#ff3366', icon: '💀', label: 'Muerto' },
    unknown: { color: '#ffb703', icon: '❓', label: 'Desconocido' }
  };

  const currentStatus = statusConfig[character.status] || statusConfig.unknown;

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Evita abrir el modal de detalles al dar clic al corazón
    toggleFavorite(character);
  };

  return (
    <div className="character-card" onClick={() => onSelect(character)}>
      <div style={{ position: 'relative' }}>
        <img 
          src={character.image} 
          alt={character.name} 
          style={{ 
            width: '100%', 
            borderRadius: '10px',
            border: '2px solid rgba(157, 78, 221, 0.4)' 
          }} 
        />
        
        {/* Badge de Estado */}
        <span style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'rgba(11, 3, 20, 0.85)',
          border: `1px solid ${currentStatus.color}`,
          color: currentStatus.color,
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          backdropFilter: 'blur(4px)'
        }}>
          {currentStatus.icon} {currentStatus.label}
        </span>

        {/* Botón de Favorito */}
        <button
          onClick={handleFavoriteClick}
          title={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            background: 'rgba(11, 3, 20, 0.85)',
            border: favorite ? '1px solid #ff3366' : '1px solid var(--neon-purple)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.2rem',
            backdropFilter: 'blur(4px)',
            transition: 'transform 0.2s ease'
          }}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
      </div>

      <h3 style={{ 
        color: '#fff', 
        margin: '12px 0 6px', 
        fontSize: '1.1rem',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}>
        {character.name}
      </h3>

      <p style={{ color: '#b8c0ec', margin: 0, fontSize: '0.85rem' }}>
        {character.species}
      </p>
    </div>
  );
};