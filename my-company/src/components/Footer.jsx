function Footer() {
  return (
    <footer style={{ backgroundColor: '#222', color: 'white', padding: '10px', textAlign: 'center', marginTop: '20px' }}>
      <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
