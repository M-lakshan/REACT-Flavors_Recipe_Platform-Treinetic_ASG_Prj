const Footer = ({ footer_logo, year, website, cur_theme }) => {
  
  return (
    <footer className={`${cur_theme}_mode`}>
      <img src={footer_logo} height="80px" alt="website logo"/>
      <p className="copyright">{year} <span>&copy;</span> {website} | All rights received</p>
    </footer>
  );
}

export default Footer;