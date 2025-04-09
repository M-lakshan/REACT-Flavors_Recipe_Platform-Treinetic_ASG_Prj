import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PopUp from '../sub_components/PopUp';
import InputField from '../sub_components/InputField';
import Recipe from '../sub_components/Recipe';

const Recipies = ({ cur_theme, cur_user }) => {
  const [recipies, setRecipies] = useState([{
    id: 1,
    pub_by: 1,
    name: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g parmesan cheese",
      "1 clove garlic",
      "Freshly ground black pepper",
      "Salt"
    ],
    recipe_tags: [
      "italian",
      "comfort food",
      "quick & easy",
      "vegetarian",
      "meat"
    ],
    instructions: [
      {name: "Preperation", period: 15, steps: [
        "Whisk the eggs and grated parmesan in a bowl", 
        "Drain the pasta and immediately toss it with the pancetta, garlic and egg mixture"
      ]}, 
      {name: "Cooking", period: 10, steps: [
        "Season with freshly ground black pepper and salt to taste", 
        "Cook the pancetta and garlic until the pancetta is crispy"
      ]},
      {name: "Serving", period: 5, steps: ["Serve with extra parmesan on top"]}
    ],
    thumbnail: "pasta-carbonara-15-667x1000.jpg"
  }]);
  const [userFavs, curUserFavs] = useState([1,2,3,4]);
  const [loading, setLoading] = useState(true);
  const [containerLayout, setContainerLayout] = useState("list");
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('/api/recipes');
        // setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        // setStatusMessage('Failed to fetch recipes. Please try again later.');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div id="recipe_page_content" className={`${cur_theme}_mode`}>
      <h1>All Recipes</h1>

      {loading && <p className="loading_meta">Loading recipes...</p>}
      {(statusMessage) && <PopUp 
        theme={cur_theme}
        title={(statusMessage.toLowerCase().includes('failed')) ? "Error" : "Success"} 
        message={statusMessage}
        evt_onclick={(e) => setStatusMessage(e)}
      />}

      <div className="controls">
        <div className="search_component">
          <span>Search: </span>
          <InputField
            cls_container={["sub_form_field"]}
            label_visible={false}
            cls_input={["sub_form_input", "text_input", "search_field"]}
            input_type={"text"}
            input_visible={true}
            input_id={"recp_phases"}
            input_value={''}
            input_placeholder={"- search criteria -"}
            evt_onchange={(e) => console.log(e.target.value)}
          />
        </div>
        <div className="layout">
          <span>Layout: </span>
          <button className={`btn_layout ${(containerLayout=="grid") ? "active" : ''}`} onClick={() => setContainerLayout("list")}>
            <i className="fa-solid fa-grip"></i>
          </button>
          <button className={`btn_layout ${(containerLayout=="list") ? "active" : ''}`} onClick={() => setContainerLayout("grid")}>
            <i className="fa-solid fa-list"></i>
          </button>
        </div>
      </div>

      {recipies.length > 0 ? (
        <div className="recipe_list">
          {[...recipies, ...recipies, ...recipies, ...recipies, ...recipies].map((recp) => <Recipe 
            key={recp.id}
            type="lite"
            evt_onclick_i={(e) => console.log(e)}
            evt_onclick_ii={(e) => console.log(e)}
            recipe_obj={recp}
            user_favs={userFavs}
            container_layout={containerLayout}
            bg_img_pre_context={""}
            />
          )}
        </div>
      ) : (
        <p>No recipes available.</p>
      )}
    </div>
  );
};

export default Recipies;