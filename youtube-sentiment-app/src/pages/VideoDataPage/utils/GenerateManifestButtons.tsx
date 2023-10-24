import styles from './GenerateManifestButtons.module.css'

function generateManifestButtons(manifestTabs: string[]) {
  return (
    <ul className={styles['manifest-buttons-ul']}>
      {manifestTabs.map((type, index) => (
        <li key={index}>
          <button className='manifest-button'>
              {type}
          </button>
      </li>
      ))}
    </ul>
  );
}

export default generateManifestButtons;
