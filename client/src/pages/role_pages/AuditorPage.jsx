import '../../styles/ProductsPageStyle.css'
import '../../styles/dashboard.css'

import React, { useEffect, useState } from 'react';
import AuditorActions from '../../components/AuditorActions.jsx'
import AuditorUsers from '../../components/AuditorUsers.jsx'
import TableAuditoria from '../../components/TableAuditoria.jsx';
import AuditorThreeTables from '../../components/AuditorThreeTables.jsx';
import { useAudit } from '../../context/AuditContext.jsx';
import AuditorGraphics from '../../components/AuditorGraphics.jsx';
import AuditorRole from '../../components/AuditorRole.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

function AuditorPage() {
  const navigate = useNavigate()
  const { dataAudit, getDataAudit } = useAudit()
  const [selectedAnalysis, setSelectedAnalysis] = useState('all');
  const [selectedButton, setSelectedButton] = useState('all'); // Nuevo estado aquí
  const [loading, setLoading] = useState(true);
  const { user } = useAuth()

  function checkUser(rol) {
    switch (rol) {
      case 1: navigate('/admin');
        break;
      case 2: navigate('/operador')
        break;
      case 3: navigate('/auditor')
        break;
      case 4: navigate('/user')
        break;
      default: navigate('/')
    }
  }

  useEffect(() => {
    if (user) {
      if (user.rol_id) checkUser(user.rol_id)
      else checkUser(user.usu_rol)
    }
  }, [user])

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
      case 'role':
        return <AuditorRole />;
      default:
        return null;
    }
  }

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h5 className="text-center p-3">Opciones de Auditor</h5>
        <button className={selectedButton === 'all' ? 'selected' : ''} onClick={() => { setSelectedAnalysis('all'); setSelectedButton('all'); }}>
          <i className="fas fa-list-alt"></i> Todos los Registros
        </button>
        <button className={selectedButton === 'graphics' ? 'selected' : ''} onClick={() => { setSelectedAnalysis('graphics'); setSelectedButton('graphics'); }}>
          <i className="fas fa-chart-line"></i> Gráficas en Acciones/Tiempo
        </button>
        <button className={selectedButton === 'acciones' ? 'selected' : ''} onClick={() => { setSelectedAnalysis('acciones'); setSelectedButton('acciones'); }}>
          <i className="fas fa-search"></i> Análisis de Acciones de Auditoría
        </button>
        <button className={selectedButton === 'usuarios' ? 'selected' : ''} onClick={() => { setSelectedAnalysis('usuarios'); setSelectedButton('usuarios'); }}>
          <i className="fas fa-users"></i> Top 5 Usuarios con Más Acciones Registradas
        </button>
        <button className={selectedButton === 'tablas' ? 'selected' : ''} onClick={() => { setSelectedAnalysis('tablas'); setSelectedButton('tablas'); }}>
          <i className="fas fa-table"></i> Análisis de las Tablas
        </button>
        <button className={selectedButton === 'role' ? 'selected' : ''} onClick={() => { setSelectedAnalysis('role'); setSelectedButton('role'); }}>
          <i className="fas fa-user-tag"></i> Análisis de los Roles
        </button>

      </div>
      <div className="content">
        {renderAnalysis()}
      </div>
    </div>
  )

}

export default AuditorPage;
