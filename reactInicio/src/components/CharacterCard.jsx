export const CharacterCard = ({ character, onSelect }) => {
  // Configuración de colores e íconos por estado
  const statusConfig = {
    Alive: { color: '#00ff88', icon: '🟢', label: 'Vivo' },
    Dead: { color: '#ff3366', icon: '💀', label: 'Muerto' },
    unknown: { color: '#ffb703', icon: '❓', label: 'Desconocido' }
  };

  const currentStatus = statusConfig[character.status] || statusConfig.unknown;

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
        {/* Badge de Estado con ícono */}
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