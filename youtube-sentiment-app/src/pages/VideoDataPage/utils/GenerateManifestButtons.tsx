import styles from './GenerateManifestButtons.module.css'

function generateManifestButtons(manifestTabs: string[], setActiveManifest: (manifest: string) => void) {
  return (
    <ul className={styles['manifest-buttons-ul']}>
      {manifestTabs.map((type, index) => (
        <li key={index}>
          <button
            className={styles['manifest-button']}
            onClick={() => setActiveManifest(type)} // Call setActiveManifest when a button is clicked
          >
            {type}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default generateManifestButtons;

