import { useEffect, useState } from 'react';
import { getEpisodeByUrl } from '../services/rickAndMortyApi';

export const ModalDetail = ({ character, onClose }) => {
  const [firstEpisode, setFirstEpisode] = useState(null);

  useEffect(() => {
    if (character && character.episode && character.episode.length > 0) {
      getEpisodeByUrl(character.episode[0])
        .then((data) => setFirstEpisode(data))
        .catch(() => setFirstEpisode(null));
    }
  }, [character]);

  if (!character) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          ✖
        </button>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <img
            src={character.image}
            alt={character.name}
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '12px',
              border: '2px solid var(--neon-green)',
              boxShadow: '0 0 15px rgba(0, 255, 136, 0.3)'
            }}
          />

          <div style={{ flex: 1, minWidth: '200px' }}>
            <h2 style={{ color: 'var(--neon-green)', margin: '0 0 10px 0' }}>{character.name}</h2>
            <p><strong>Estado:</strong> {character.status}</p>
            <p><strong>Especie:</strong> {character.species}</p>
            <p><strong>Género:</strong> {character.gender}</p>
            <p><strong>Origen:</strong> {character.origin?.name}</p>
            <p><strong>Ubicación actual:</strong> {character.location?.name}</p>
            {firstEpisode && (
              <p style={{ color: 'var(--portal-green)' }}>
                <strong>Primer episodio:</strong> {firstEpisode.name} ({firstEpisode.episode})
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};