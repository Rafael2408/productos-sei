import { useState } from "react";
import TableProductsPurchased from "../../components/TableProductsPurchased"
import TableUsers from "../../components/TableUsers"
import ProductsPage from "../ProductsPage"

function AdminPage() {
  const [selectedOption, setSelectedOption] = useState('ProductsPage');

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h5 className="text-center">Opciones de Administrador</h5>
        <button onClick={() => setSelectedOption('ProductsPage')}>Productos</button>
        <button onClick={() => setSelectedOption('TableUsers')}>Usuarios</button>
        <button onClick={() => setSelectedOption('TableProductsPurchased')}>Productos Comprados</button>
      </div>
      <div className="content">
        {selectedOption === 'ProductsPage' && <ProductsPage />}
        {selectedOption === 'TableUsers' && <TableUsers />}
        {selectedOption === 'TableProductsPurchased' && <TableProductsPurchased />}
      </div>
    </div>
  )
}

export default AdminPage;
