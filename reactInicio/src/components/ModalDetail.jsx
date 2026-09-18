import { useState, useEffect } from 'react';
import { getEpisodeByUrl } from '../services/rickAndMortyApi';

export const ModalDetail = ({ character, onClose }) => {
  const [firstEpisodeName, setFirstEpisodeName] = useState('');

  const targetEpisode = character?.episode?.[0] || '';

  useEffect(() => {
    let isMounted = true;

    if (!targetEpisode) return;

    getEpisodeByUrl(targetEpisode)
      .then((data) => {
        if (isMounted) {
          setFirstEpisodeName(data.name);
        }
      })
      .catch(() => {
        if (isMounted) {
          setFirstEpisodeName('No disponible');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [targetEpisode]);

  if (!character) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)',
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
        maxWidth: '420px',
        width: '90%',
        color: '#fff',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 0 20px rgba(0, 255, 204, 0.4)'
      }}>
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute', top: '10px', right: '15px',
            background: 'none', border: 'none', color: '#ff4d4d',
            fontSize: '1.8rem', cursor: 'pointer', fontWeight: 'bold'
          }}
        >
          &times;
        </button>

        <img 
          src={character.image} 
          alt={character.name} 
          style={{ width: '140px', borderRadius: '50%', border: '3px solid #00ffcc' }} 
        />
        
        <h2 style={{ color: '#00ffcc', margin: '15px 0 10px' }}>{character.name}</h2>
        
        <div style={{ textAlign: 'left', marginTop: '15px', fontSize: '0.95rem', lineHeight: '1.6' }}>
          <p><strong>Estado:</strong> {character.status}</p>
          <p><strong>Especie:</strong> {character.species}</p>
          <p><strong>Género:</strong> {character.gender}</p>
          <p><strong>Origen:</strong> {character.origin?.name}</p>
          <p><strong>Ubicación actual:</strong> {character.location?.name}</p>
          <p><strong>Aparición inicial:</strong> {firstEpisodeName || 'Cargando...'}</p>
          <p><strong>Total de episodios:</strong> {character.episode?.length || 0}</p>
        </div>
      </div>
    </div>
  );
};