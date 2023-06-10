import styles from "../styles/Bottombar.module.css";

const Bottombar = () => {
  return (
    <div className={styles.container}>
      <a
        href="https://github.com/RCNOverwatcher/portfolio"
        target="_blank"
        rel="noreferrer noopener"
        className={styles.section}
      ></a>
    </div>
  );
};

export default Bottombar;
