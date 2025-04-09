import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../sub_components/InputField';
import BtnDeleteOrCancel from '../sub_components/BtnDeleteOrCancel';
import BtnAdd from '../sub_components/BtnAdd';
import PopUp from '../sub_components/PopUp';

const Publish = ({ cur_theme, cur_user }) => {
  const defRecpDuration = "01:30";
  const defRecpStageValues = [
    {name: "Preperation", period: 15, steps: ["step #1", "step #2"]}, 
    {name: "Cooking", period: 10, steps: ["step #1", "step #2"]},
    {name: "Serving", period: 5, steps: ["step #1", "step #2"]}
  ];
  const defRecpIngrds = ["ingredient #1","ingredient #2","ingredient #3"];
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
  const demoRecipe = {
    thumbnail: '',
    name: '',
    desc: '',
    durs: defRecpDuration,
    type: [],
    ingrds: defRecpIngrds,
    instrs: defRecpStageValues
  };
  const [defRecpStages, setDefRecpStages] = useState(3);
  const [newIngredient, setNewIngredient] = useState("- new ingredient -");
  const [recipe, setRecipe] = useState(demoRecipe);
  const [recpThumbnail, setRecpThumbnail] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const setCurRecpStageValues_alt = (type, index, value) => {
    let recp_stg = (recipe.instrs.length > 0) ? recipe.instrs[index] : { name: '', period: 0, steps: [] };
    let new_recp_stgs = [...recipe.instrs.filter((obj,idx) => idx!=index)];
    
    if(type=="name") {
      recp_stg.name = value;
    } else if(type=="period") {
      recp_stg.period = value;
    } else {
      (recp_stg.includes(value.trim())) && recp_stg.steps.push(value);
    }

    new_recp_stgs = [...new_recp_stgs, recp_stg];

    setRecipe("stg",new_recp_stgs);
  }

  const setRecipe_alt = (type, value) => {
    let updated_recp = {...recipe};
    
    if(type=="name") {
      updated_recp.name = value;
    } else if(type=="durs") {
      updated_recp.durs = value;
    } else if(type=="desc") {
      updated_recp.desc = value;
    } else if(type=="tags") {
      updated_recp.type = value;
    } else if(type=="ingrds") {
      updated_recp.ingrds = [...document.querySelectorAll(".recp_ingrd_input")].map(elm => elm.value).sort();
    } else {
      updated_recp.instrs = value;
    }

    setRecipe(updated_recp);
  }

  const updateRecipeDurs = (evt) => {
    let time = evt.target.value;
    
    if (time.length === 5 && !time.includes(":")) {
      let upd_val = time.replace(/(\d{2})(\d{2})/, "$1:$2");
      
      evt.target.value = upd_val;
      setRecipe_alt("durs", upd_val);
    }
  }

  const updateRecipeInsStg = (type, opr, idx_i=0, idx_ii=0) => {
    let ext_recipe = {...recipe};
    
    if(type=="stg") {
      if(opr=="new" || opr=="new_alt") {
        (ext_recipe.instrs.length < 7) && ext_recipe.instrs.push({
          name: "- new stage -", 
          period: 0, 
          steps: ["step #1", "step #2"]
        });
      } else if(opr=="rmv_alt") {
        (ext_recipe.instrs.length > 3) && ext_recipe.instrs.pop();
      } else {
        ext_recipe.instrs = ext_recipe.instrs.filter((stg,idx) => idx!=idx_i);
      }
    } else {
      let stage = ext_recipe.instrs[idx_i];
      let steps = stage.steps;

      if(opr=="new") {
        steps.push(`step #${steps.length+1}`);
      } else {
        steps = steps.filter((step,idx) => idx!=idx_ii);
      }

      stage.steps = steps;
      ext_recipe.instrs = [...ext_recipe.instrs.slice(0,idx_i), stage, ...ext_recipe.instrs.slice(idx_i+1)];
    }

    setRecipe_alt("stg",ext_recipe.instrs);
  }
  
  const updateIngredients = (opr,val) => {
    let ingrds = [...recipe.ingrds]; 
    
    if(opr=="rmv") {
      ingrds = ingrds.filter(ingrd => ingrd!=val);
    } else {
      ingrds = [val, ...ingrds].sort();
      setNewIngredient("- new ingredient -");
    }

    setRecipe_alt("ingrds",ingrds);
  } 

  const updateRecipeTypeTags = (val) => {
    let tags = [...recipe.type]; 
    let opr = recipe.type.includes(val) ? "rmv" : "add";
    
    if(opr=="rmv") {
      tags = tags.filter(tag => tag!=val);
    } else {
      tags = [val, ...tags].sort();
    }

    setRecipe_alt("tags",tags);
  } 

  const handleImageUpload = (event,revert=false) => {
    
    if(!revert) {
      // create a URL for the image file and set it as background
      let file = event.target.files[0];
      let obj_url = URL.createObjectURL(file);
      
      if (file) {
        console.log(file);
        document.querySelector(".recp_preview_tag").classList.add('active');
        document.querySelector(".recp_preview_tag").innerHTML = file["name"];
        document.querySelector(".recp_preview_main").style = `background: url(${obj_url});`;
        document.querySelector(".recp_preview_alt").style = `background: url(${obj_url});`;
        // setRecpThumbnail(URL.createObjectURL(file));
      }
    } else {
      document.querySelector(".recp_preview_tag").classList.remove('active');
      document.querySelector(".recp_preview_tag").innerHTML = '- no IMG file selected -';
      document.querySelector(".recp_preview_main").style = `background: none;`;
      document.querySelector(".recp_preview_alt").style = `background: var(--body_bg));`;
      setRecpThumbnail('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    try {
      const response = await axios.post('#', recipe);

      if (response.status === 200) {
        setStatusMessage('Recipe successfully uploaded!');
        setRecipe(demoRecipe); // reassign to demo values
      }
    } catch (error) {
      setStatusMessage('Failed to post recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="publish_page_content" className={`${cur_theme}_mode`}>
      <h1>Publish a New-Recipe</h1>
      
      <div className="recp_preview_main">
        <form onSubmit={handleSubmit}>
          <InputField
            cls_container={["form_field", "param"]}
            label_visible={false}
            cls_input={["form_input", "text_input"]}
            input_visible={false}
            input_id={"recp_by"}
            input_value={cur_user.user_id}
          />
          <InputField
            cls_container={["form_field"]}
            label_visible={true}
            label_value={"Recipe Thumbnail: "}
            cls_label={["form_attribute"]}
            cls_input={["form_input", "file_input"]}
            input_visible={true}
            input_id={"recp_preview"}
            input_type={"file"}
            input_value={(recpThumbnail) ? recpThumbnail : ''}
            evt_onchange={(e) => handleImageUpload(e)}
          />
          <p className="form_field recp_preview_tag">- no IMG file selected -</p>
          {(recpThumbnail) && <BtnDeleteOrCancel type="del" evt_onclick={() => setRecpThumbnail(null)} />}
          <InputField
            cls_container={["form_field"]}
            label_visible={true}
            label_value={"Recipe Title: "}
            cls_label={["form_attribute"]}
            cls_input={["form_input", "text_input"]}
            input_type={"text"}
            input_visible={true}
            input_id={"recp_name"}
            input_placeholder={"- name for your recipe -"}
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
            input_placeholder={"- brief description about your recipe -"}
            evt_onchange={(e) => setRecipe_alt("desc",e.target.value)}
          />
          <InputField
            cls_container={["form_field"]}
            label_visible={true}
            label_value={"Recipe Duration: "}
            cls_label={["form_attribute"]}
            cls_input={["form_input", "number_input"]}
            input_type={"text"}
            input_visible={true}
            input_id={"recp_durs"}
            input_placeholder={defRecpDuration}
            post_tag={"(in hours)"}
            evt_onchange={(e) => updateRecipeDurs(e)}
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
          <div className="form_field recp_types">
            {(recipe.type.length > 0) && <button 
              className={`recp_tag tag_deselctor ${(recipe.type.length > 0) ? "active" : ''}`} 
              onClick={(e) => setRecipe_alt("tags", [])}>Deselect All
            </button>}
            {(recipe.type.length > 0) && <span>|</span>}
            {recipe_types.sort().map((tag,idx) => <button key={idx+1} 
              className={`recp_tag ${(recipe.type.includes(tag)) ? "active" : ''}`} 
              onClick={(e) => updateRecipeTypeTags(tag)}>#{tag}
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
            input_value={recipe.ingrds}
            input_id={"recp_ingrds"}
          />
          <div className="form_field_alt recp_ingrds">
            {recipe.ingrds.map((ingrd,idx) => <div className="form_field" key={idx+1}>
              <InputField
                cls_container={["sub_form_field"]}
                label_visible={false}
                cls_input={["sub_form_input", "text_input", "recp_ingrd_input"]}
                input_type={"text"}
                input_visible={true}
                input_id={`recp_ingrd_${idx}`}
                input_placeholder={ingrd}
                evt_onchange={(e) => console.log("ingrds",e.target.value)}
              />
              {(recipe.ingrds.length>3) && <BtnDeleteOrCancel type="bkspc" 
                evt_onclick={() => updateIngredients("rmv",ingrd)} 
              />}
            </div>)}
            <div className="form_field new_ingrd">
              <InputField
                cls_container={["sub_form_field","sub_form_field_alt"]}
                label_visible={false}
                cls_input={["sub_form_input", "text_input", "recp_ingrd_input"]}
                input_type={"text"}
                input_visible={true}
                input_id={`recp_ingrd_new`}
                input_placeholder={newIngredient}
                evt_onchange={(e) => setNewIngredient(e.target.value)}
              />
              <BtnAdd type="add" evt_onclick={() => updateIngredients("new",newIngredient)} />
            </div>
          </div>
          <div className="form_field recp_phases_set">
            <InputField
              cls_container={["sub_form_field"]}
              label_visible={true}
              label_value={"Recipe Phases: "}
              cls_label={["form_attribute"]}
              cls_input={["sub_form_input", "number_input"]}
              input_type={"number"}
              input_visible={false}
              input_id={"recp_phases"}
              input_value={defRecpStages}
              evt_onchange={(e) => setDefRecpStages(e.target.value)}
            />
            <div className="sub_form_field recp_phases_alt">
              <BtnAdd type="dec" post_info={null} revert={true} cls_alt={(recipe.instrs.length > 3) ? '' : "unavailable"} evt_onclick={() => updateRecipeInsStg("stg","rmv_alt")} />
              <span>{recipe.instrs.length}</span>
              <BtnAdd type="inc" post_info={null} cls_alt={(recipe.instrs.length < 7) ? '' : "unavailable"} evt_onclick={() => updateRecipeInsStg("stg","new_alt")} />
            </div>
          </div>
          <div className="form_field recp_stages">
            <label className="form_attribute">Instructions: </label>
            {recipe.instrs.map((stg,idx) => <div key={idx+1} className="recp_stg_container">
              <p className="pre_info phase">PHASE {(idx+1 < 10) ? '0'+(idx+1).toString() : idx+1}</p>
              <InputField
                cls_container={["sub_form_field", "stage_name"]}
                label_visible={false}
                cls_input={["form_input sub_form_input", "text_input"]}
                input_type={"text"}
                input_visible={true}
                post_tag={"(in)"}
                input_id={`recp_stage_${idx}_name`}
                input_value={(recipe.instrs.length > 0) ? recipe.instrs[idx].name : defRecpStageValues[idx].name}
                input_placeholder={(recipe.instrs.length > 0) ? recipe.instrs[idx].period : defRecpStageValues[idx].period}
                evt_onchange={(e) => setCurRecpStageValues_alt("name",idx,e.target.value)}
              />
              <InputField
                cls_container={["sub_form_field", "stage_period"]}
                label_visible={false}
                cls_input={["form_input sub_form_input", "number_input"]}
                input_type={"text"}
                input_visible={true}
                input_id={`recp_stage_${idx}_period`}
                post_tag={"(mins)"}
                input_value={(recipe.instrs.length > 0) ? recipe.instrs[idx].period : defRecpStageValues[idx].period}
                input_placeholder={(recipe.instrs.length > 0) ? recipe.instrs[idx].period : defRecpStageValues[idx].period}
                evt_onchange={(e) => setCurRecpStageValues_alt("period",idx,e.target.value)}
              />
              {(idx>2) && <BtnDeleteOrCancel type="del" evt_onclick={() => updateRecipeInsStg("stg","rmv",idx)} />}
              <div className="steps">
                <p className="pre_info steps_set">STEPS</p>
                {recipe.instrs[idx].steps.map((step,idx_alt) => <div key={idx_alt+1} className="recp_step_container">
                  <InputField
                    cls_container={["sub_form_field"]}
                    label_visible={false}
                    cls_input={["form_input sub_form_input", "text_input"]}
                    input_type={"text"}
                    input_visible={true}
                    input_id={`recp_stage_${idx_alt}_step_${idx_alt}`}
                    input_value={step}
                    evt_onchange={(e) => setCurRecpStageValues_alt("name",idx_alt,e.target.value)}
                  />
                  {(idx_alt>1) && <BtnDeleteOrCancel type="del" evt_onclick={() => updateRecipeInsStg("stp","rmv",idx,idx_alt)} />}
                </div>)}
                <BtnAdd 
                  type="add" 
                  post_info={`${(recipe.instrs[idx].steps.length > 0) ? "another" : 'a'} step`} 
                  evt_onclick={() => updateRecipeInsStg("stp","new",idx)} 
                />
              </div>
            </div>)}
          </div>
          <div className="recp_preview_alt">
            <button className="btn_img" onClick={() => document.getElementById("recp_preview").click()}>
              <i className="fa-solid fa-image"></i>
            </button>
            {(recpThumbnail!="- no IMG file selected -") && <BtnDeleteOrCancel type="del" evt_onclick={(e) => handleImageUpload(e,true)} />}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Posting Recipe...' : 'Post Recipe'}
          </button>
        </form>
      </div>

      {(statusMessage) && <PopUp 
        theme={cur_theme}
        title={(statusMessage.toLowerCase().includes('failed')) ? "Error" : "Success"} 
        message={statusMessage}
        evt_onclick={(e) => setStatusMessage(e)}
      />}
    </div>
  );
};

export default Publish;