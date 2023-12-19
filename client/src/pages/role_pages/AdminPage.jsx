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
        <button className={selectedButton === 'ProductsPage' ? 'selected' : ''} onClick={() => { setSelectedOption('ProductsPage'); setSelectedButton('ProductsPage'); }}>Productos</button>
        <button className={selectedButton === 'TableUsers' ? 'selected' : ''} onClick={() => { setSelectedOption('TableUsers'); setSelectedButton('TableUsers'); }}>Usuarios</button>
        <button className={selectedButton === 'TableProductsPurchased' ? 'selected' : ''} onClick={() => { setSelectedOption('TableProductsPurchased'); setSelectedButton('TableProductsPurchased'); }}>Productos Comprados</button>
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
