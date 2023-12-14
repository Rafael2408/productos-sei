import '../styles/ProductsPageStyle.css';
import { useEffect } from "react"
import { useAudit } from "../context/AuditContext"
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function AuditorActions() {

    const { dataAudit, getDataAudit } = useAudit()

    useEffect(() => {
        getDataAudit()
    }, [])

    const actionCounts = dataAudit.reduce((counts, audit) => {
        counts[audit.aud_accion] = (counts[audit.aud_accion] || 0) + 1;
        return counts;
    }, {});
    const data = Object.keys(actionCounts).map((key, index) => ({
        name: key,
        value: actionCounts[key],
        color: ['rgb(152, 251, 152)', 'rgb(135, 206, 235)', 'rgb(255, 192, 203)'][index % 3] // Colores para 'INSERT', 'UPDATE', 'DELETE'
    }));

    return (
        <>
            <h1>Análisis de Acciones de Auditoría</h1>
            <div id='centrarDiv'>
                <PieChart width={500} height={500}>
                    <Pie
                        data={data}
                        cx={250}
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
                    <Legend />
                </PieChart>
            </div>
        </>
    )
}

export default AuditorActions;
