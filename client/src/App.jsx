import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import LoginPage from './pages/auth_pages/LoginPage'
import RegisterPage from './pages/auth_pages/RegisterPage'
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
import Navbar from './components/Navbar'
import UserPage from './pages/role_pages/UserPage'


function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <AuditProvider>
          <BrowserRouter>
          <Navbar/>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />


              <Route element={<ProtectedRoute />}>
                <Route path='/products' element={<ProductsPage />} />
                <Route path='/products/:id' element={<ProductFormPage />} />

                <Route path='/add-product' element={<ProductFormPage />} />
                <Route path='/profile' element={<ProfilePage />} />

                <Route path='/admin' element={<AdminPage />} />
                <Route path='/auditor' element={<AuditorPage />} />
                <Route path='/operador' element={<OperadorPage />} />
                <Route path='/user' element={<UserPage />} />


              </Route>


            </Routes>
          </BrowserRouter>
        </AuditProvider>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App