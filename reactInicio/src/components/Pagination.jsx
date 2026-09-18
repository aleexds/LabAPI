export const Pagination = ({ page, setPage, info }) => {
  return (
    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '20px 0' }}>
      <button 
        disabled={!info?.prev} 
        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
        style={{
          padding: '8px 16px',
          background: info?.prev ? '#00ffcc' : '#555',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: info?.prev ? 'pointer' : 'not-allowed'
        }}
      >
        Anterior
      </button>
      <span style={{ color: '#fff', alignSelf: 'center' }}>Página {page}</span>
      <button 
        disabled={!info?.next} 
        onClick={() => setPage(prev => prev + 1)}
        style={{
          padding: '8px 16px',
          background: info?.next ? '#00ffcc' : '#555',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: info?.next ? 'pointer' : 'not-allowed'
        }}
      >
        Siguiente
      </button>
    </div>
  );
};