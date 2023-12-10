import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { AuthProvider } from './context/AuthContext'
import ConfirmationCodePage from './pages/ConfirmationCodePage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>Home Page</h1>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/confirmation-code' element={< ConfirmationCodePage/>} />
          <Route path='/products' element={<h1>Products Page</h1>} />
          <Route path='/add-product' element={<h1>New Product </h1>} />
          <Route path='/products/:id' element={<h1>Update Product</h1>} />
          <Route path='/profile' element={<h1>Home Page</h1>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App