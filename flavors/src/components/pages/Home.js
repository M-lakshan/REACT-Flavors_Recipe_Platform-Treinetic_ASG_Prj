import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRecipes } from '../../redux/recipeSlice';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('#') // Replace with your actual API endpoint
      .then(response => {
        dispatch(setRecipes(response.data)); // Dispatch the recipes to Redux
      })
      .catch(error => {
        console.error("Error fetching recipes:", error);
      });
  }, [dispatch]);

  return (
    <div id="homepage_content">
      <header>
        <h1>Welcome to Recipe Master!</h1>
        <p>Your one-stop destination for delicious recipes, cooking tips, and much more.</p>
      </header>

      <section className="about">
        <h2>About Us</h2>
        <p>
          Recipe Master is a platform designed for food enthusiasts, offering a wide variety of recipes, 
          cooking tutorials, and tips. Whether you're a beginner or an experienced chef, we have something for everyone.
        </p>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-list">
          <div className="feature">
            <h3>Wide Recipe Collection</h3>
            <p>Browse through thousands of recipes from various cuisines around the world.</p>
          </div>
          <div className="feature">
            <h3>Easy-to-Follow Instructions</h3>
            <p>Step-by-step guides to make cooking simple and fun for everyone.</p>
          </div>
          <div className="feature">
            <h3>Personalized Recipe Recommendations</h3>
            <p>Get recommendations based on your preferences and past recipes.</p>
          </div>
          <div className="feature">
            <h3>Cooking Community</h3>
            <p>Join a vibrant community of fellow food lovers to share your experiences and recipes.</p>
          </div>
        </div>
      </section>

      <section className="registration">
        <h2>Get Started Today!</h2>
        <p>Join Recipe Master and start exploring delicious recipes.</p>
        <button id="btn_registration" onClick={() => navigate('/registration')} className="sub_nav_link_ii">
          Sign-Up
        </button>
      </section>
    </div>
  );
};

export default Home;
