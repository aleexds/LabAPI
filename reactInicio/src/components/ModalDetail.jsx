export const ModalDetail = ({ character, onClose }) => {
  if (!character) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#16213e',
        border: '2px solid #00ffcc',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '400px',
        width: '90%',
        color: '#fff',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute', top: '10px', right: '15px',
            background: 'none', border: 'none', color: '#ff4d4d',
            fontSize: '1.5rem', cursor: 'pointer'
          }}
        >
          &times;
        </button>
        <img src={character.image} alt={character.name} style={{ width: '150px', borderRadius: '50%', border: '3px solid #00ffcc' }} />
        <h2>{character.name}</h2>
        <p><strong>Estado:</strong> {character.status}</p>
        <p><strong>Especie:</strong> {character.species}</p>
        <p><strong>Género:</strong> {character.gender}</p>
        <p><strong>Origen:</strong> {character.origin?.name}</p>
        <p><strong>Ubicación:</strong> {character.location?.name}</p>
      </div>
    </div>
  );
};