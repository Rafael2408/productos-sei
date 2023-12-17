import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useAudit } from '../context/AuditContext';
import { useEffect, useState } from 'react';

function AuditorGraphics() {
  const { dataAudit, getDataAudit } = useAudit();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataAudit();
    setTimeout(() => {
      setLoading(false);
    }, 900);
  }, []);

  const tables = ['PRODUCTOS', 'USUARIOS', 'PRODUCTOS_COMPRADOS'];
  const colors = ['red', 'green', 'blue']; // Colores para las líneas

  const data = tables.map(table => {
    const tableData = dataAudit.filter(audit => audit.aud_tabla === table)
      .reduce((acc, audit) => {
        const date = new Date(audit.aud_fecha).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

    return Object.keys(tableData).map(date => ({
      name: date,
      [table]: tableData[date]
    }));
  });

  return (
    <div className="p-3">
      <h2 className="text-center">Análisis de Acciones por Tabla en el Tiempo</h2>
      <div id='centrarDiv' className={loading ? 'spin' : ''}>
        {!loading && tables.map((table, i) => (
          <div key={i}>
            <h3 className="text-center">{table}</h3>
            <h4>Total de acciones: {data[i].reduce((total, item) => total + item[table], 0)}</h4> {/* Línea agregada */}
            <LineChart width={850} height={500} data={data[i]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" fill="#fff" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={table} stroke={colors[i]} activeDot={{ r: 8 }} />
            </LineChart>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuditorGraphics;
