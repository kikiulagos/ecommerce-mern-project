import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer bg-gray-50 dark:bg-gray-800 text-gray-900  p-6">
      <div className="footer-content">
        <p>&copy; 2024 LP</p>

        <div className='logofooter'>
          <img src="/logo.png" alt="Logo" />
        </div>

        <ul className="footer-links">
          <li><a href="/about" className="text-black">Sobre Nosotros</a></li>
          <li><a href="#services" className="text-black">Servicios</a></li>
          <li><a href="#services" className="text-black">Seguridad de la Empresa</a></li>
          <li><a href="#contact" className="text-black">Más información</a></li>
        </ul>

        <div className="footer-section">
          <h3 className="">Métodos de Pago</h3>
          <div className="payment-methods">
            <img src="../../../Public/visa.png" alt="Visa" className="payment-icon" />
            <img src="../../../Public/card.png" alt="MasterCard" className="payment-icon" />
            <img src="../../../Public/paypal.png" alt="PayPal" className="payment-icon" />
            <img src="../../../Public/apple-pay.png" alt="Apple Pay" className="payment-icon" />
          </div>
        </div>

        <div className="footer-section">
          <h3 className="">Contacto</h3>
          <p className="">Email: contactolp@gmail.com</p>
          <p className="">Teléfono: +56 9 1122 3344</p>  
        </div>

        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link text-gray-900">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link text-gray-900 ">X</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link text-gray-900 ">Instagram</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
