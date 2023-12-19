import '../styles/ProductsPageStyle.css'
import { useEffect, useState } from "react"
import { useAudit } from "../context/AuditContext"
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function AuditorRole() {

    const { dataAudit, getDataAudit } = useAudit()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDataAudit()
        setTimeout(() => {
            setLoading(false);
        }, 900); // Espera 2 segundos antes de mostrar el gráfico
    }, [])

    const roleCounts = dataAudit.reduce((counts, audit) => {
        counts[audit.rol_nombre] = (counts[audit.rol_nombre] || 0) + 1;
        return counts;
    }, {});
    // Convertir el objeto a un array y ordenarlo de mayor a menor
    const sortedRoles = Object.keys(roleCounts).map(key => ({
        name: key,
        value: roleCounts[key]
    })).sort((a, b) => b.value - a.value);

    const totalActions = dataAudit.length;

    return (
        <>
            <div className='p-3'>
                <h2 className='text-center'>Acciones por Rol</h2>
                <h3 className='text-center'>Total de acciones: {totalActions}</h3>
                <div id='centrarDiv' className={loading ? 'spin' : ''}>
                    {!loading && (
                        <PieChart width={600} height={500}>
                            <Pie
                                data={sortedRoles}
                                cx={300}
                                cy={250}
                                labelLine={false}
                                outerRadius={180}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                {
                                    sortedRoles.map((entry, index) => <Cell key={`cell-${index}`} fill={[
                                        'rgb(255, 182, 193)',
                                        'rgb(240, 230, 140)',
                                        'rgb(152, 251, 152)',
                                        'rgb(135, 206, 235)',
                                        'rgb(221, 160, 221)'
                                    ][index % 5]} />)
                                }
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    )}
                </div>
            </div>
        </>
    )
}

export default AuditorRole;
