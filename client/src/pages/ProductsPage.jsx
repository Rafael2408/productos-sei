import { useAuth } from "../context/AuthContext"

function ProductsPage() {

  const {user} = useAuth()
  console.log(user)
  
  return (
    <div>ProductsPage</div>
  )
}

export default ProductsPage