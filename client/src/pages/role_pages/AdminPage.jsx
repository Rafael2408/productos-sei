import { useState } from "react";
import TableProductsPurchased from "../../components/TableProductsPurchased"
import TableUsers from "../../components/TableUsers"
import ProductsPage from "../ProductsPage"

function AdminPage() {
  const [selectedOption, setSelectedOption] = useState('ProductsPage');

  return (
    <>
      <h1 className="text-center">Página de Administrador</h1>
      <div className="text-center">
        <div className="btn-group" role="group" aria-label="Dashboard">
          <button type="button" className={`btn btn-${selectedOption === 'ProductsPage' ? 'primary' : 'secondary'}`} onClick={() => setSelectedOption('ProductsPage')}>Productos</button>
          <button type="button" className={`btn btn-${selectedOption === 'TableUsers' ? 'primary' : 'secondary'}`} onClick={() => setSelectedOption('TableUsers')}>Usuarios</button>
          <button type="button" className={`btn btn-${selectedOption === 'TableProductsPurchased' ? 'primary' : 'secondary'}`} onClick={() => setSelectedOption('TableProductsPurchased')}>Productos Comprados</button>
        </div>
      </div>

      {selectedOption === 'ProductsPage' && <ProductsPage />}
      {selectedOption === 'TableUsers' && <TableUsers />}
      {selectedOption === 'TableProductsPurchased' && <TableProductsPurchased />}
    </>
  )
}

export default AdminPage
