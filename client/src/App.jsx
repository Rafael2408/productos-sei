import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ConfirmationCodePage from './pages/ConfirmationCodePage'
import ProductFormPage from './pages/ProductFormPage'
import ProductsPage from './pages/ProductsPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route path='/confirmation-code' element={< ConfirmationCodePage/>} />

          <Route path='/products' element={<ProductsPage/>} />
          <Route path='/add-product' element={<ProductFormPage/>} />
          <Route path='/products/:id' element={<ProductFormPage/>} />
          <Route path='/profile' element={<ProfilePage/>} />

          

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App