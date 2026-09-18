export const FilterBar = ({ status, setStatus, species, setSpecies }) => {
  return (
    <div style={{ 
      display: 'flex', 
      gap: '15px', 
      justifyContent: 'center', 
      flexWrap: 'wrap', 
      marginBottom: '20px' 
    }}>
      {/* Filtro por Estado */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{
          padding: '10px 14px',
          borderRadius: '12px',
          border: '2px solid var(--neon-purple)',
          background: 'rgba(26, 9, 51, 0.9)',
          color: '#00ff88',
          fontWeight: 'bold',
          outline: 'none',
          cursor: 'pointer'
        }}
      >
        <option value="">Todos los Estados</option>
        <option value="alive">Vivo (Alive)</option>
        <option value="dead">Muerto (Dead)</option>
        <option value="unknown">Desconocido (Unknown)</option>
      </select>

      {/* Filtro por Especie */}
      <select
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        style={{
          padding: '10px 14px',
          borderRadius: '12px',
          border: '2px solid var(--neon-purple)',
          background: 'rgba(26, 9, 51, 0.9)',
          color: '#00ff88',
          fontWeight: 'bold',
          outline: 'none',
          cursor: 'pointer'
        }}
      >
        <option value="">Todas las Especies</option>
        <option value="human">Humano</option>
        <option value="alien">Alien</option>
        <option value="humanoid">Humanoide</option>
        <option value="poopybutthole">Poopybutthole</option>
        <option value="mythological">Mitológico</option>
        <option value="robot">Robot</option>
        <option value="cronenberg">Cronenberg</option>
        <option value="animal">Animal</option>
      </select>
    </div>
  );
};