import '../styles/ProductsPageStyle.css'
import { useEffect, useState } from "react"
import { useAudit } from "../context/AuditContext"
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function AuditorUsersPage() {

    const { dataAudit, getDataAudit } = useAudit()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDataAudit()
        setTimeout(() => {
            setLoading(false);
        }, 900); // Espera 2 segundos antes de mostrar el gráfico
    }, [])

    const userCounts = dataAudit.reduce((counts, audit) => {
        counts[audit.usu_nombre] = (counts[audit.usu_nombre] || 0) + 1;
        return counts;
    }, {});
    // Convertir el objeto a un array y ordenarlo de mayor a menor
    const sortedUsers = Object.keys(userCounts).map(key => ({
        name: key,
        value: userCounts[key]
    })).sort((a, b) => b.value - a.value);
    // Tomar solo los primeros 5 usuarios
    const topUsers = sortedUsers.slice(0, 5);

    const totalActions = dataAudit.length;

    return (
        <>
            <h2>Top 5 Usuarios con Más Acciones Registradas</h2>
            <h3>Total de acciones: {totalActions}</h3>
            <div id='centrarDiv' className={loading ? 'spin' : ''}>
                {!loading && (
                    <PieChart width={550} height={550}>
                        <Pie
                            data={topUsers}
                            cx={250}
                            cy={250}
                            labelLine={false}
                            outerRadius={180}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                        >
                            {
                                topUsers.map((entry, index) => <Cell key={`cell-${index}`} fill={[
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
        </>
    )
}

export default AuditorUsersPage;
