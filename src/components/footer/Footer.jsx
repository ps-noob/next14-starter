import styles from "./footer.module.css";
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>nextdev</div>
      <div className={styles.text}>Creative Agency © All rights reserved.</div>
    </div>
  );
};

export default Footer;
