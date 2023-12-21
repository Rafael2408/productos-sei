import '../../styles/ProductsPageStyle.css'
import '../../styles/dashboard.css'

import React, { useEffect, useState } from 'react';
import ProductPage from '../ProductsPage'
import ProductsPurchased from '../../components/ProductsPurchased';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'

function UserPage() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [selectedPage, setSelectedPage] = useState('productos'); // Establece 'productos' como valor inicial

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
            if(user.rol_id) checkUser(user.rol_id)
            else checkUser(user.usu_rol)
        }
    }, [user])

    const renderPage = () => {
        switch (selectedPage) {
            case 'productos':
                return <ProductPage />;
            case 'compras':
                return <ProductsPurchased />;
            default:
                return null;
        }
    }

    return (
        <div className="dashboard">
            <div className="sidebar">
                <button onClick={() => setSelectedPage('productos')}>
                    <i className="fas fa-box-open"></i> Productos
                </button>
                <button onClick={() => setSelectedPage('compras')}>
                    <i className="fas fa-shopping-cart"></i> Productos Comprados
                </button>

            </div>
            <div className="content">
                
                    {renderPage()}
                
            </div>
        </div>
    )
}

export default UserPage
