import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('/api/recipes');
        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recipes. Please try again later.');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipe-page">
      <h1>All Recipes</h1>

      {loading && <p>Loading recipes...</p>}
      {error && <p className="error-message">{error}</p>}

      {recipes.length > 0 ? (
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="recipe-item">
              <Link to={`/cooking/${recipe.id}`}>
                <h2>{recipe.name}</h2>
                <p>{recipe.description}</p>
                <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes available.</p>
      )}
    </div>
  );
};

export default Recipe;