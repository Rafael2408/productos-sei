import React, { useState } from 'react';
import AuditorActions from '../../components/AuditorActions.jsx'
import AuditorUsers from '../../components/AuditorUsers.jsx'
import { motion, useAnimation } from 'framer-motion';

function AuditorPage() {
  const [selectedAnalysis, setSelectedAnalysis] = useState('');
  const controls = useAnimation();

  const handleAnalysisChange = (event) => {
    setSelectedAnalysis(event.target.value);
    controls.start({
      backgroundColor: ["#fff", "#ddd", "#fff"],
      transition: { duration: 1 }
    });
  };

  return (
    <>
      <h1>AuditorPage</h1>
      <div>
        <motion.select
          animate={controls}
          value={selectedAnalysis}
          onChange={handleAnalysisChange}
        >
          <option value="">-- Por favor selecciona un análisis --</option>
          <option value="acciones">Análisis de Acciones de Auditoría</option>
          <option value="usuarios">Top 5 Usuarios con Más Acciones Registradas</option>
          {/* Agrega aquí más opciones según sea necesario */}
        </motion.select>

        {selectedAnalysis === 'acciones' && <AuditorActions />}
        {selectedAnalysis === 'usuarios' && <AuditorUsers />}
        {/* Asegúrate de tener los componentes AuditorActions y AuditorUsers definidos */}
      </div>
    </>
  )
}

export default AuditorPage;
