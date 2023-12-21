import { useState } from "react";
import TableProductsPurchased from "../../components/TableProductsPurchased"
import TableUsers from "../../components/TableUsers"
import ProductsPage from "../ProductsPage"

function AdminPage() {
  const [selectedOption, setSelectedOption] = useState('ProductsPage');
  const [selectedButton, setSelectedButton] = useState('ProductsPage'); // Nuevo estado aquí

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h5 className="text-center p-2">Opciones de Administrador</h5>
        <button className={selectedButton === 'ProductsPage' ? 'selected' : ''} onClick={() => { setSelectedOption('ProductsPage'); setSelectedButton('ProductsPage'); }}>
          <i className="fas fa-box-open"></i> Productos
        </button>
        <button className={selectedButton === 'TableUsers' ? 'selected' : ''} onClick={() => { setSelectedOption('TableUsers'); setSelectedButton('TableUsers'); }}>
          <i className="fas fa-users"></i> Usuarios
        </button>
        <button className={selectedButton === 'TableProductsPurchased' ? 'selected' : ''} onClick={() => { setSelectedOption('TableProductsPurchased'); setSelectedButton('TableProductsPurchased'); }}>
          <i className="fas fa-shopping-cart"></i> Productos Comprados
        </button>

      </div>
      <div className="content" >
        {selectedOption === 'ProductsPage' && <ProductsPage />}
        {selectedOption === 'TableUsers' && <TableUsers />}
        {selectedOption === 'TableProductsPurchased' && <TableProductsPurchased />}
      </div>
    </div>
  )
}

export default AdminPage;
