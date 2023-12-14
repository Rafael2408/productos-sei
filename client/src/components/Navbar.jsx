import '../styles/Navbar.css'

import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth()

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" id='NavBar'>
            <div className="container-fluid d-flex justify-content-between" >
                <Link className="navbar-brand" to="/" id='titleNavbar'>Productos - SEI</Link>
                {isAuthenticated? (
                    <>
                        
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav">
                                {user.rol_id !== 3 && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link btn" to="/products" id='btnVerListaProductos'>Ver Lista de Productos</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link btn btn-info" to="/add-product" >Agregar un Producto</Link>
                                        </li>
                                    </>
                                )}
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-danger" to="/" onClick={() => { logout() }} >Cerrar Sesión</Link>
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
                                    <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Registrarse</Link>
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
