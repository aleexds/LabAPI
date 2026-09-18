export const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Buscar personaje..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        width: '100%',
        maxWidth: '400px',
        padding: '12px 16px',
        borderRadius: '20px',
        border: '2px solid #00ffcc',
        background: '#0f3460',
        color: '#fff',
        outline: 'none',
        fontSize: '1rem',
        margin: '20px 0'
      }}
    />
  );
};