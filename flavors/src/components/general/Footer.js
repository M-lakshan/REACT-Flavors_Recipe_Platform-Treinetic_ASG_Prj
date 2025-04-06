const Footer = ({ footer_logo, website }) => {
  
  return (
    <footer>
      <img src={footer_logo} height="80px" alt="website logo"/>
      <p className="copyright">{website} <span>&copy;</span> all rights received</p>
    </footer>
  );
}

export default Footer;