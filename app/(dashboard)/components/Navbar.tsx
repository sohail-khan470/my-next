import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MySite</div>

      <ul className={styles.navLinks}>
        <li>
          <Link href="/" className={styles.link}>
            Home
          </Link>
        </li>

        <li>
          <Link href="/about" className={styles.link}>
            About
          </Link>
        </li>

        <li>
          <Link href="/contact" className={styles.link}>
            Contact
          </Link>
        </li>
        <li>
          <Link href="/projects" className={styles.link}>
            Projects
          </Link>
        </li>
      </ul>
    </nav>
  );
}
