import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import LoginPage from './pages/auth_pages/LoginPage'
import RegisterPage from './pages/auth_pages/RegisterPage'
import ConfirmationCodePage from './pages/auth_pages/ConfirmationCodePage'
import ProductFormPage from './pages/ProductFormPage'
import ProductsPage from './pages/ProductsPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'

import ProtectedRoute from './ProtectedRoute'
import AdminPage from './pages/role_pages/AdminPage'
import AuditorPage from './pages/role_pages/AuditorPage'
import OperadorPage from './pages/role_pages/OperadorPage'
import { ProductProvider } from './context/ProductContext'
import { AuditProvider } from './context/AuditContext'


function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <AuditProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/confirmation-code' element={< ConfirmationCodePage />} />


              <Route element={<ProtectedRoute />}>
                <Route path='/products' element={<ProductsPage />} />
                <Route path='/add-product' element={<ProductFormPage />} />
                <Route path='/products/:id' element={<ProductFormPage />} />
                <Route path='/profile' element={<ProfilePage />} />

                <Route path='/admin' element={<AdminPage />} />
                <Route path='/auditor' element={<AuditorPage />} />
                <Route path='/operador' element={<OperadorPage />} />

              </Route>


            </Routes>
          </BrowserRouter>
        </AuditProvider>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App