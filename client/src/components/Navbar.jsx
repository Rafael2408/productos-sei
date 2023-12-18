import '../styles/Navbar.css'

import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from 'react'

function Navbar() {
    const { isAuthenticated, logout, user, loading } = useAuth()
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (user) setRole(user.rol_id);
    }, [user, isAuthenticated])

    if (loading) {
        return <div>Cargando...</div>
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" id='NavBar'>
            <div className="container-fluid d-flex justify-content-between" >
                <Link className="navbar-brand" to="/" id='titleNavbar'>Productos - SEI</Link>
                {isAuthenticated ? (
                    <>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav">
                                {(role !== 3) && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link btn btn-info" to="/add-product" >
                                                <i className="fas fa-plus"></i> Agregar un Producto
                                            </Link>
                                        </li>
                                        {(role === 2) &&
                                            <li className="nav-item">
                                                <Link className="nav-link btn" to='/operador' id='btnVerListaProductos'>
                                                    <i className="fas fa-list"></i> Ver Lista de Productos
                                                </Link>
                                            </li>
                                        }
                                        {(role === 4) &&
                                            <li className="nav-item">
                                                <Link className="nav-link btn" to='/user' id='btnVerListaProductos'>
                                                    <i className="fas fa-list"></i> Ver Lista de Productos
                                                </Link>
                                            </li>
                                        }
                                    </>
                                )}
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-danger" to="/" onClick={() => { logout() }} >
                                        <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-info" to="/login">
                                        <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-success nav-link" to="/register">
                                        <i className="fas fa-user-plus"></i> Registrarse
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
