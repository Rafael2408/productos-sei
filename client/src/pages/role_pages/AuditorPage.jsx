import '../../styles/ProductsPageStyle.css'

import React, { useState } from 'react';
import AuditorActions from '../../components/AuditorActions.jsx'
import AuditorUsers from '../../components/AuditorUsers.jsx'
import TableAuditoria from '../../components/TableAuditoria.jsx';

function AuditorPage() {
  const [selectedAnalysis, setSelectedAnalysis] = useState('');

  const handleAnalysisChange = (event) => {
    setSelectedAnalysis(event.target.value);
  };

  return (
    <>
      <div id='centrarDiv'>
        <select
          style={{ margin: '1em', padding: '0.5em' }}
          value={selectedAnalysis}
          onChange={handleAnalysisChange}
        >
          <option value="">-- Por favor selecciona un análisis --</option>
          <option value="all">Todos los Registros</option>
          <option value="acciones">Análisis de Acciones de Auditoría</option>
          <option value="usuarios">Top 5 Usuarios con Más Acciones Registradas</option>
          {/* Agrega aquí más opciones según sea necesario */}
        </select>

        {selectedAnalysis === 'all' && <TableAuditoria />}
        {selectedAnalysis === 'acciones' && <AuditorActions />}
        {selectedAnalysis === 'usuarios' && <AuditorUsers />}
        {/* Asegúrate de tener los componentes AuditorActions y AuditorUsers definidos */}
      </div>
    </>
  )
}

export default AuditorPage;
