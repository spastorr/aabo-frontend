/**
 * DebugGanttChart - Ultra simple version for debugging
 * @module features/projects/gantt/components/DebugGanttChart
 */

const DebugGanttChart = ({ documents = [], revisions = [] }) => {
  console.log('DebugGanttChart rendered with:', { documents, revisions });
  
  return (
    <div style={{ padding: '2rem', backgroundColor: 'white', border: '2px solid #ccc', borderRadius: '8px' }}>
      <h2>📅 Cronograma de Documentos - Debug</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>📊 Estadísticas</h3>
        <p><strong>Total Documentos:</strong> {documents.length}</p>
        <p><strong>Total Revisiones:</strong> {revisions.length}</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>📄 Documentos</h3>
        {documents.length === 0 ? (
          <p style={{ color: 'red' }}>❌ No hay documentos para mostrar</p>
        ) : (
          <div>
            {documents.map((doc, index) => (
              <div key={doc.id} style={{ 
                padding: '1rem', 
                margin: '0.5rem 0', 
                backgroundColor: '#f9f9f9', 
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}>
                <h4>{doc.code}</h4>
                <p><strong>Nombre:</strong> {doc.name}</p>
                <p><strong>Disciplina:</strong> {doc.discipline}</p>
                <p><strong>Estado:</strong> {doc.status}</p>
                <p><strong>Inicio:</strong> {doc.startDate}</p>
                <p><strong>Fin:</strong> {doc.endDate}</p>
                <p><strong>Responsable:</strong> {doc.responsible}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3>📋 Revisiones</h3>
        {revisions.length === 0 ? (
          <p style={{ color: 'red' }}>❌ No hay revisiones para mostrar</p>
        ) : (
          <div>
            {revisions.map((rev, index) => (
              <div key={rev.id} style={{ 
                padding: '0.5rem', 
                margin: '0.25rem 0', 
                backgroundColor: '#f0f0f0', 
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}>
                <strong>{rev.documentId}</strong> - Rev. {rev.revision} - {rev.date} - {rev.status}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DebugGanttChart;
