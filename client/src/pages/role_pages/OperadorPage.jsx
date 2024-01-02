import { useEffect } from 'react';
import '../../styles/ProductsPageStyle.css'

import ProductsPage from '../ProductsPage'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function OperadorPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

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
      if (user.rol_id) checkUser(user.rol_id)
      else checkUser(user.usu_rol)
    }
  }, [user])

  return (
    <>
      <div className='p-3'>
        <h1 className='text-center'>Página de Operador</h1>
        <ProductsPage />
      </div>
    </>
  )
}

export default OperadorPage