export const CharacterCard = ({ character, onSelect }) => {
  const statusColor = 
    character.status === 'Alive' ? '#00ffcc' : 
    character.status === 'Dead' ? '#ff4d4d' : '#aaa';

  return (
    <div 
      onClick={() => onSelect(character)}
      style={{
        background: '#1a1a2e',
        border: '1px solid #00ffcc',
        borderRadius: '12px',
        padding: '12px',
        cursor: 'pointer',
        boxShadow: '0 0 10px rgba(0, 255, 204, 0.2)',
        textAlign: 'center',
        transition: 'transform 0.2s'
      }}
    >
      <img 
        src={character.image} 
        alt={character.name} 
        style={{ width: '100%', borderRadius: '8px' }} 
      />
      <h3 style={{ color: '#fff', margin: '10px 0 5px' }}>{character.name}</h3>
      <p style={{ color: '#ccc', margin: 0, fontSize: '0.9rem' }}>
        <span style={{ 
          height: '10px', 
          width: '10px', 
          backgroundColor: statusColor, 
          borderRadius: '50%', 
          display: 'inline-block', 
          marginRight: '6px' 
        }}></span>
        {character.status} - {character.species}
      </p>
    </div>
  );
};