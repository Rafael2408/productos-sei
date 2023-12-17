import '../../styles/ProductsPageStyle.css'
import '../../styles/dashboard.css'

import React, { useEffect, useState } from 'react';
import AuditorActions from '../../components/AuditorActions.jsx'
import AuditorUsers from '../../components/AuditorUsers.jsx'
import TableAuditoria from '../../components/TableAuditoria.jsx';
import AuditorThreeTables from '../../components/AuditorThreeTables.jsx';
import { useAudit } from '../../context/AuditContext.jsx';
import AuditorGraphics from '../../components/AuditorGraphics.jsx';

function AuditorPage() {
  const { dataAudit, getDataAudit } = useAudit()
  const [selectedAnalysis, setSelectedAnalysis] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataAudit()
    setTimeout(() => {
      setLoading(false);
    }, 900); // Espera 2 segundos antes de mostrar el gráfico
  }, [])

  const renderAnalysis = () => {
    switch (selectedAnalysis) {
      case 'all':
        return <TableAuditoria />;
      case 'acciones':
        return <AuditorActions />;
      case 'usuarios':
        return <AuditorUsers />;
      case 'tablas':
        return <AuditorThreeTables />;
      case 'graphics':
        return <AuditorGraphics />;
      default:
        return null;
    }
  }

  return (
    <div className="dashboard">
      <div className="sidebar">
        <button onClick={() => setSelectedAnalysis('all')}>Todos los Registros</button>
        <button onClick={() => setSelectedAnalysis('graphics')}>Gráficas en Acciones/Tiempo</button>
        <button onClick={() => setSelectedAnalysis('acciones')}>Análisis de Acciones de Auditoría</button>
        <button onClick={() => setSelectedAnalysis('usuarios')}>Top 5 Usuarios con Más Acciones Registradas</button>
        <button onClick={() => setSelectedAnalysis('tablas')}>Análisis de las Tablas</button>
      </div>
      <div className="content">
        {renderAnalysis()}
      </div>
    </div>
  )
  
}

export default AuditorPage;
