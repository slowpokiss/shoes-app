import { Link, NavLink, Outlet } from "react-router-dom"
import { useSelector } from "react-redux";

const scrollTop = () => window.scrollTo({
  top: 0,
  behavior: 'smooth'
})

export default function Navigation() {
  const currCartCount = useSelector(
    (state: unknown) => state.cartSlice.cartCount
  );
  const localCartCount = localStorage.getItem('cartCount')
  
  return (
    <>
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link to='/' className='navbar-brand'>
              <img src='../../img/header-logo.png' alt="Bosa Noga" />
            </Link>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">Главная</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/catalog">Каталог</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">О магазине</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contacts">Контакты</NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                  <Link to={'/cart'} className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">{localCartCount ? localCartCount: 0}</div>
                    <div className="header-controls-cart-menu"></div>
                  </Link>
                </div>
                <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                  <input className="form-control" placeholder="Поиск" />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <Outlet />

    <footer className="container bg-light footer">
      <div className="footer-container">
        <div className="footer-container-item footer-info">
          <section>
            <p className='footer-item-title'>Информация</p>
            <ul className="nav flex-column">
              <Link to='/about' onClick={scrollTop} className="nav-item">О магазине</Link>
              <Link to='/catalog' onClick={scrollTop} className="nav-item">Каталог</Link>
              <Link to='/contacts' onClick={scrollTop} className="nav-item">Контакты</Link>
            </ul>
          </section>
        </div>
        <div className="footer-container-item footer-payment">
          <section>
            <p className='footer-item-title'>Принимаем к оплате:</p>
            <div className="footer-pay">
              <div className="footer-pay-systems footer-pay-systems-paypal"></div>
              <div className="footer-pay-systems footer-pay-systems-master-card"></div>
              <div className="footer-pay-systems footer-pay-systems-visa"></div>
              <div className="footer-pay-systems footer-pay-systems-yandex"></div>
              <div className="footer-pay-systems footer-pay-systems-webmoney"></div>
              <div className="footer-pay-systems footer-pay-systems-qiwi"></div>
            </div>
          </section>
          <section>
            <div className="footer-copyright">2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров.
              <br />
              Все права защищены.Доставка по всей России!
            </div>
          </section>
        </div>
        <div className="col text-right footer-container-item footer-contacts">
          <section>
            <p className='footer-item-title'>Контакты:</p>
            <a className="footer-contacts-phone" href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
            <span className="footer-contacts-working-hours">Ежедневно: с 09-00 до 21-00</span>
            <a className="footer-contacts-email" href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
            <div className="footer-social-links">
              <div className="footer-social-link footer-social-link-twitter"></div>
              <div className="footer-social-link footer-social-link-vk"></div>
            </div>
          </section>
        </div>
      </div>
    </footer>
    </>
  )
}