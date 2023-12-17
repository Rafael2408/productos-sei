import '../styles/HomePage.css'
import logo from '../assets/logo_UTN.png'
import img1 from '../assets/imagen1.png'
import img2 from '../assets/imagen2.png'
import img3 from '../assets/imagen3.png'
import circular from '../assets/circular.jpg'
function HomePage() {
  return (
    <>
      <div>
        <div id="carouselExampleDark" class="carousel carousel-dark slide">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="10000">
              <img src={img1} class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <img className='logo' src={logo} alt="Logo_Universidad" />
                <h1 className='titulo_home'>Universidad Técnica del Norte</h1>
                <h2 className='subtitulo_home'>Seguridad informatica</h2>
                <h3 className='texto_home'>Seguridad implementada a un aplicativo de venta de productos (CRUD)</h3>
              </div>
            </div>
            <div class="carousel-item" data-bs-interval="2000">
              <img src={img2} class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <img className='logo' src={logo} alt="Logo_Universidad" />
                <h1 className='titulo_home'>Encuentra las frutas más frescas</h1>
                <h2 className='subtitulo_home'>Descuento en frutos rojos</h2>
                <h3 className='texto_home'>Aplica tus cupones de descuento</h3>
              </div>
            </div>
            <div class="carousel-item">
              <img src={img3} class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <img className='logo' src={logo} alt="Logo_Universidad" />
                <h1 className='titulo_home'>Descuento en productos de canasta básica</h1>
                <h2 className='subtitulo_home'>Descubre lo que nececsitas</h2>
                <h3 className='texto_home'>Descubre las mejores ofertas en harinas y aceites</h3>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <div className='integrantes'>
          <h2 className='subtitulo_home2'> Integrantes</h2>
          <div className='subcontenedor'>
            <div>
              <h4>de la Cruz Espinosa Brayan</h4>
              <h4>Echeverría Soto Victor Eduardo</h4>
              <h4>Rosero Cuaspud Jorge Rafael</h4>
              <h4>Sandoval Pumisacho Alan Davor</h4>
            </div>
            <div className='img_circulo'>
              <img className='circular' src={circular} alt="" />
            </div>
          </div>
        </div>
        <footer className='footer_home'>
          <p>Proyecto para fines de testeo de seguridad informatica UTN 2023</p>
        </footer>
      </div>
    </>
  )
}

export default HomePage