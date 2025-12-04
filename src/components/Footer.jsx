import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  
  const anioActual = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <ul className={styles.footerNav}>
        <li>
          <Link to="/nosotros" className={styles.footerLink}>Nosotros</Link>
        </li>
        <li>
          <Link to="/Faqs" className={styles.footerLink}>FAQ</Link>
        </li>
        <li>
          <a href="#" className={styles.footerLink}>Política de Privacidad</a>
        </li>
      </ul>
      <p className={styles.copyright}>
        © {anioActual} Ghost. Todos los derechos reservados.
      </p>
    </footer>
  );
}


export default Footer;




