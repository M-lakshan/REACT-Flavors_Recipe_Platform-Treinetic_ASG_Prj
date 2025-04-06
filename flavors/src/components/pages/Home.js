import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRecipes } from '../../redux/recipeSlice';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();

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
      <h1>Welcome to the Recipe Management Platform</h1>
      {/* Render recipes here */}
    </div>
  );
};

export default Home;
