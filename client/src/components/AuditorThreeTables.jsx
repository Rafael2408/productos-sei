import { useEffect, useState } from "react";
import { useAudit } from "../context/AuditContext";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function AuditorThreeTables() {
    const { dataAudit, getDataAudit } = useAudit();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDataAudit();
        setTimeout(() => {
            setLoading(false);
        }, 900);
    }, []);

    const actionCounts = dataAudit.reduce((counts, audit) => {
        if (['PRODUCTOS', 'USUARIOS', 'PRODUCTOS_COMPRADOS'].includes(audit.aud_tabla)) {
            counts[audit.aud_tabla] = (counts[audit.aud_tabla] || 0) + 1;
        }
        return counts;
    }, {});

    const data = Object.keys(actionCounts).map((key, index) => ({
        name: key,
        value: actionCounts[key],
        color: ['rgb(152, 251, 152)', 'rgb(135, 206, 235)', 'rgb(255, 192, 203)'][index % 3]
    }));

    const totalActions = data.reduce((total, action) => total + action.value, 0);

    return (
        <>
            <h2>Análisis de Acciones por Tabla</h2>
            <h3>Total de acciones: {totalActions}</h3>
            <div id='centrarDiv' className={loading ? 'spin' : ''}>
                {!loading && (
                    <PieChart width={850} height={500}>
                        <Pie
                            data={data}
                            cx={400}
                            cy={250}
                            labelLine={false}
                            outerRadius={180}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                            {
                                data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
                            }
                        </Pie>
                        <Tooltip />
                        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    </PieChart>
                )}
            </div>
        </>
    );
}

export default AuditorThreeTables;
