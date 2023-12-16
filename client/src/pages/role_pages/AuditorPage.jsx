import '../../styles/ProductsPageStyle.css'
import '../../styles/dashboard.css'

import React, { useEffect, useState } from 'react';
import AuditorActions from '../../components/AuditorActions.jsx'
import AuditorUsers from '../../components/AuditorUsers.jsx'
import TableAuditoria from '../../components/TableAuditoria.jsx';
import AuditorThreeTables from '../../components/AuditorThreeTables.jsx';
import { useAudit } from '../../context/AuditContext.jsx';

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

  return (
    <div className="container-fluid">
      <div className="row">
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <button className="nav-link" onClick={() => setSelectedAnalysis('all')}>Todos los Registros</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => setSelectedAnalysis('acciones')}>Análisis de Acciones de Auditoría</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => setSelectedAnalysis('usuarios')}>Top 5 Usuarios con Más Acciones Registradas</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => setSelectedAnalysis('tablas')}>Análisis de las Tablas</button>
              </li>
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {selectedAnalysis === 'all' && <TableAuditoria />}
          {selectedAnalysis === 'acciones' && <AuditorActions />}
          {selectedAnalysis === 'usuarios' && <AuditorUsers />}
          {selectedAnalysis === 'tablas' && <AuditorThreeTables />}
        </main>
      </div>
    </div>
  )
}

export default AuditorPage;
