import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../sub_components/InputField';
import BtnDeleteOrCancel from '../sub_components/BtnDeleteOrCancel';
import BtnAdd from '../sub_components/BtnAdd';

const Publish = ({ cur_theme, cur_user }) => {
  const recipe_types = [
    "vegetarian",
    "vegan",
    "gluten-free",
    "dairy-free",
    "paleo",
    "keto",
    "low-carb",
    "high-protein",
    "raw",
    "organic",
    "mediterranean",
    "asian",
    "italian",
    "mexican",
    "indian",
    "comfort food",
    "quick & easy",
    "breakfast",
    "lunch",
    "dinner",
    "dessert",
    "snacks",
    "appetizers",
    "soups & stews",
    "salads",
    "smoothies",
    "grilled",
    "baked",
    "one-pot",
    "slow cooker",
    "instant pot",
    "family-friendly",
    "kid-friendly",
    "seasonal",
    "holiday",
    "bbq",
    "meat",
    "chicken",
    "beef",
    "pork",
    "seafood",
    "fish",
    "shellfish",
    "sweets",
    "spicy",
    "savoury",
    "healthy",
    "light",
    "cleansing",
    "sugar-free"
  ];
  const [defRecpDuration, setDefRecpDuration] = useState("01:30");
  const [defRecpIngrds, setDefRecpIngrds] = useState(3);
  const [defRecpStages, setDefRecpStages] = useState(3);
  const [defRecpStageValues, setDefRecpStageValues] = useState([
    {name: "Preperation", period: 15, steps: ["instruction step #1", "instruction step #2"]}, 
    {name: "Cooking", period: 10, steps: ["instruction step #1", "instruction step #2"]},
    {name: "Serving", period: 5, steps: ["instruction step #1", "instruction step #2"]}
  ]);
  const [curRecpStageValues, setCurRecpStageValues] = useState(defRecpStageValues);
  const [recipe, setRecipe] = useState({
    name: '',
    desc: '',
    duration: defRecpDuration,
    type: [],
    ingrds: [],
    instructions: curRecpStageValues
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const setCurRecpStageValues_alt = (type, index, value) => {
    let recp_stg = (curRecpStageValues.length > 0) ? curRecpStageValues[index] : { name: '', period: 0, steps: [] };
    let new_recp_stgs = [...curRecpStageValues.filter((obj,idx) => idx!=index)];
    
    if(type=="name") {
      recp_stg.name = value;
    } else if(type=="period") {
      recp_stg.period = value;
    } else {
      (recp_stg.includes(value.trim())) && recp_stg.steps.push(value);
    }

    new_recp_stgs = [...new_recp_stgs, recp_stg];

    setCurRecpStageValues(new_recp_stgs);
  }

  const setRecipe_alt = (type, value, removal=false) => {
    // let recp_stg = (curRecpStageValues.length > 0) ? curRecpStageValues[index] : { name: '', period: 0, steps: [] };
    // let new_recp_stgs = [...curRecpStageValues.filter((obj,idx) => idx!=index)];
    
    // if(type=="name") {
    //   recp_stg.name = value;
    // } else if(type=="period") {
    //   recp_stg.period = value;
    // } else {
    //   (recp_stg.includes(value.trim())) && recp_stg.steps.push(value);
    // }

    // new_recp_stgs = [...new_recp_stgs, recp_stg];

    // setRecipe(new_recp_stgs);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    try {
      // Replace the API endpoint with your actual API
      const response = await axios.post('/api/recipes', recipe);

      if (response.status === 200) {
        setStatusMessage('Recipe successfully posted!');
        setRecipe({
          name: '',
          description: '',
          ingredients: '',
          instructions: '',
        });
      }
    } catch (error) {
      setStatusMessage('Failed to post recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="publish-page">
      <h1>Publish a New Recipe</h1>
      
      <form onSubmit={handleSubmit}>
        <InputField
          cls_container={["form_field param"]}
          label_visible={false}
          cls_input={["form_input", "text_input"]}
          input_visible={false}
          input_id={"recp_by"}
          input_value={cur_user.user_id}
        />
        <InputField
          cls_container={["form_field"]}
          label_visible={true}
          label_value={"Recipe Title: "}
          cls_label={["form_attribute"]}
          cls_input={["form_input", "text_input"]}
          input_type={"text"}
          input_visible={true}
          input_id={"recp_name"}
          evt_onchange={(e) => setRecipe_alt("name",e.target.value)}
        />
        <InputField
          cls_container={["form_field"]}
          label_visible={true}
          label_value={"Recipe Description: "}
          cls_label={["form_attribute"]}
          cls_input={["form_input", "textarea_input"]}
          input_type={"textarea"}
          input_visible={true}
          input_id={"recp_desc"}
          evt_onchange={(e) => setRecipe_alt("desc",e.target.value)}
        />
        <InputField
          cls_container={["form_field"]}
          label_visible={true}
          label_value={"Recipe Duration: "}
          cls_label={["form_attribute"]}
          cls_input={["form_input", "number_input"]}
          input_type={"time"}
          input_visible={true}
          input_id={"recp_desc"}
          input_value={defRecpDuration}
          input_placeholder={defRecpDuration}
          post_tag={"(in hours)"}
          evt_onchange={(e) => setRecipe_alt("durs",e.target.value)}
        />
        <InputField
          cls_container={["form_field"]}
          label_visible={true}
          label_value={"Recipe Type: "}
          cls_label={["form_attribute"]}
          cls_input={["form_input", "text_input"]}
          input_type={"text"}
          input_visible={false}
          input_id={"recp_type"}
          evt_onchange={(e) => setRecipe_alt("type",e.target.value)}
        />
        <div className="recp_types">
          {recipe_types.map((tag,idx) => <button key={idx+1} 
            className={(recipe.type.includes(tag)) ? "active" : ''} 
            onClick={(e) => setRecipe_alt("type",tag)}>#{tag}
          </button>)}
        </div>
        <InputField
          cls_container={["form_field"]}
          label_visible={true}
          label_value={"Recipe Ingredients: "}
          cls_label={["form_attribute"]}
          cls_input={["form_input", "text_input"]}
          input_type={"text"}
          input_visible={false}
          input_id={"recp_ingrds"}
        />
        <div className="recp_types"></div>
        <InputField
          cls_container={["form_field"]}
          label_visible={true}
          label_value={"Recipe Phases: "}
          cls_label={["form_attribute"]}
          cls_input={["form_input", "number_input"]}
          input_type={"number"}
          input_visible={true}
          input_id={"recp_phases"}
          input_value={defRecpStages}
          evt_onchange={(e) => setDefRecpStages(e.target.value)}
        />
        <div className="recp_stages">
          <label className="form_attribute">Instructions: </label>
          <BtnAdd type="add" post_info="another stage" evt_onlcick={() => setRecipe_alt("stg",0)} />
          {defRecpStageValues.map((stg,idx) => <div key={idx+1} className="recp_stg_container">
            <p className="pre_info phase">PHASE {(idx+1 < 10) ? '0'+(idx+1).toString() : idx+1}</p>
            <InputField
              cls_container={["form_field", "sub_form_field"]}
              label_visible={false}
              cls_input={["form_input sub_form_input", "text_input"]}
              input_type={"text"}
              input_visible={true}
              input_id={`recp_stage_${idx}_name`}
              input_value={(curRecpStageValues.length > 0) ? curRecpStageValues[idx].name : defRecpStageValues[idx].name}
              input_placeholder={(curRecpStageValues.length > 0) ? curRecpStageValues[idx].period : defRecpStageValues[idx].period}
              evt_onchange={(e) => setCurRecpStageValues_alt("name",idx,e.target.value)}
            />
            <InputField
              cls_container={["form_field", "sub_form_field"]}
              label_visible={false}
              cls_input={["form_input sub_form_input", "number_input"]}
              input_type={"time"}
              input_visible={true}
              input_id={`recp_stage_${idx}_period`}
              input_value={(curRecpStageValues.length > 0) ? curRecpStageValues[idx].period : defRecpStageValues[idx].period}
              input_placeholder={(curRecpStageValues.length > 0) ? curRecpStageValues[idx].period : defRecpStageValues[idx].period}
              evt_onchange={(e) => setCurRecpStageValues_alt("period",idx,e.target.value)}
            />
            {(idx>3) && <BtnDeleteOrCancel type="del" evt_onlcick={() => setRecipe_alt("stg",idx,true)} />}
            <div className="steps">
              {recipe.instructions[idx].steps.map((step,idx_alt) => <div key={idx_alt+1} className="recp_step_container">
                <p className="pre_info step_id">STEP {(idx_alt+1 < 10) ? '0'+(idx_alt+1).toString() : idx_alt+1}</p>
                <InputField
                  cls_container={["form_field", "sub_form_field"]}
                  label_visible={false}
                  cls_input={["form_input sub_form_input", "text_input"]}
                  input_type={"text"}
                  input_visible={true}
                  input_id={`recp_stage_${idx_alt}_step_${idx_alt}`}
                  input_value={step}
                  evt_onchange={(e) => setCurRecpStageValues_alt("name",idx_alt,e.target.value)}
                />
                {(idx_alt>2) && <BtnDeleteOrCancel type="del" evt_onlcick={() => setRecipe_alt("stg",idx_alt,true)} />}
              </div>)}
              <BtnAdd type="add" post_info={`${(recipe.instructions[idx].steps.length > 0) ? 'a' : "another"} step`} evt_onlcick={() => setRecipe_alt("stg",idx)} />
            </div>
          </div>)}
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Posting Recipe...' : 'Post Recipe'}
        </button>
      </form>

      {statusMessage && (
        <div className={`status-message ${statusMessage.includes('failed') ? 'error' : 'success'}`}>
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default Publish;