import OutputHeader from "../Header/OutputHeader";
import styles from "./Navbar.module.css"; // Import the styles

function Navbar() {
  return (
    <nav className={styles["navbar"]}>
      <div className={styles["navbar-container"]}>
        <ul className={styles["navbar-links"]}>
          <li>
            <a href="/">Home</a>
          </li>
          <li> | </li>
          <li>
            <a href="/ChannelSearch">Channel</a>
          </li>
          <li>
            <a href="/VideoSearch">Video</a>
          </li>
          <li>
            <a href="/GeneralSearch">Search</a>
          </li>
          <li> | </li>
          <li>
            <a href="/VideoDBPage">Video DB</a>
          </li>
          <li>
            <a href="/VideoDataPage">Video Data</a>
          </li>
          <li> | </li>
          <li>
            <a href="/DocumentationPage">Documentation</a>
          </li>
        </ul>
        <OutputHeader />
      </div>
    </nav>
  );
}

export default Navbar;
