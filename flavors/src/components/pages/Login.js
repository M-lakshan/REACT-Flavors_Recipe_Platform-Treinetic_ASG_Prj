import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ cur_theme }) => {
  const navigate = useNavigate();  

  return <button id="btn_registration" onClick={() => navigate('/registration')} className="sub_nav_link_ii">
          Sign-Up
        </button>;


}

export default Login;