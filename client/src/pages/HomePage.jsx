import '../styles/HomePage.css'
import logo from '../assets/logo_UTN.png' 
function HomePage() {
  return (
    <>
      <body>
        <div className='contenido'>
          <img src={logo} alt="Logo_Universidad" />
          <h1>Universidad Técnica del Norte</h1>
          <h2>Seguridad informatica</h2>
          <h3>Seguridad implementada a un aplicativo de venta de productos (CRUD)</h3>
        </div>
        <div className='integrantes'>
          <h4>de la Cruz Espinosa Brayan</h4>
          <h4>Echeverría Soto Victor Eduardo</h4>
          <h4>Rosero Cuaspud Jorge Rafael</h4>
          <h4>Sandoval Pumisacho Alan Davor</h4>
        </div>
      </body>
    </>
  )
}

export default HomePage