const Footer = () => {

  const styles = {
    footer: {
      background: 'linear-gradient(90deg, #1e1e2f, #2a2a40)',
      color: '#ccc',
      textAlign: 'center',
      padding: '15px 0',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.3)',
      fontSize: '14px',
      letterSpacing: '0.5px'
    },
    text: {
      margin: 0
    }
  };

  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        &copy; 2026 My App. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;