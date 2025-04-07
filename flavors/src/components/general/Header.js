import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleTheme } from '../../redux/themeSlice'; 

const Header = ({ header_logo, cur_theme, cur_user }) => {
  const [nav_collapsed, setNavCollapsed] = useState(true);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();  

  const updateTheme = () => dispatch(toggleTheme());

  return (
    <header className={`${cur_theme}_mode`}>
      <div id="header_logo">
        <Link to="/"><img src={header_logo} width="120px" alt="website logo"/></Link>
      </div>
      <button 
        id="header_nav_toggler" 
        onClick={() => setNavCollapsed(!nav_collapsed)}>
        {(nav_collapsed) ? <i className="fa-solid fa-bars"></i> : <i className="fa-brands fa-mixer"></i>}
      </button>
      <nav className={`navigator ${(nav_collapsed) ? '' : "toggled"}`}>
        <div className="nav_links">
          <p className="nav_link nav_link_i"><Link to="/recipes">Recipes</Link></p>
          <p className="nav_link nav_link_ii"><Link to="/cooking">Cooking</Link></p>
          <p className="nav_link nav_link_iii"><Link to="/publish">Publish</Link></p>
          <p className="nav_link nav_link_iv"><Link to="/help">Help</Link></p>
        </div>
        <div className="sub_nav_links">
          <button id="btn_wishlist" onClick={() => navigate('/whishlist')} className="sub_nav_link_i">
            <abbr title={`${(cur_user) ? "view my favorites" : "sign-in to view favories"}`}>
              <i className="fa-solid fa-heart"></i>
            </abbr>
          </button>
          <button id="btn_login" onClick={() => navigate('/login')} className="sub_nav_link_ii">
            <abbr title={`sign-${(cur_user) ? "out" : "in"}`}>
              <i className={`fa-solid fa-person-walking-${(cur_user) ? "arrow-loop-left" : "dashed-line-arrow-right"}`}></i>
            </abbr>
          </button>
        </div>
      </nav>
      <button 
        id="btn_theme_toggler" 
        className={`${cur_theme}_mode`}
        onClick={() => updateTheme()} 
      >
        <i className="fa-solid fa-circle"></i>
        <i className={`fa-solid fa-sun ${(cur_theme != "dark") ? "active" : ''}`}></i>
        <i className={`fa-solid fa-moon ${(cur_theme == "dark") ? "active" : ''}`}></i>
      </button>
    </header>
  );
};

export default Header;