import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOngoingRecipe, clearOngoingRecipe } from '../../redux/cookingSlice';
import { useParams } from 'react-router-dom';

const Cooking = () => {
  const dispatch = useDispatch();
  const { id } = useParams();  // Assume you're passing the recipe ID in the URL
  const ongoingRecipe = useSelector((state) => state.cooking.ongoingRecipe);

  // Example: Start cooking the recipe
  useEffect(() => {
    // Fetch the recipe from your state or API using the ID
    if(id) {
      const recipe = { id, name: "Sample Recipe", ingredients: ["ingredient 1", "ingredient 2"] };
      
      // Dispatch to set the ongoing recipe
      dispatch(setOngoingRecipe(recipe));
    }
      
    // Clean up or reset when unmounting
    return () => {
      dispatch(clearOngoingRecipe());
    };
  }, [id, dispatch]);

  return (
    <div>
      <h1>Cooking {ongoingRecipe ? ongoingRecipe.name : "No recipe selected"}</h1>
      {/* Display cooking details */}
    </div>
  );
};

export default Cooking;
