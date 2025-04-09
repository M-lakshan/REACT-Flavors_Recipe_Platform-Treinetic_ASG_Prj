import React from 'react';

const Recipe = ({ type, evt_onclick_i, evt_onclick_ii, recipe_obj, user_favs, bg_img_pre_context, container_layout="list" }) => {
  let { id, pub_by, name, description, ingredients, instructions, tags, thumbnail } = recipe_obj;
  // style={{background: `url("${bg_img_pre_context}/${thumbnail}")`}}
  
  if(type!="full") {
    return <div className={`recipe recipe_${id} ${container_layout}_item`}
        onClick={(e) => console.log(e)}
      >
      <div className="preview">
        
        <button onClick={() => evt_onclick_ii(user_favs.includes(id))}>
          <abbr title={`${(!user_favs.includes(id)) ? "add to my favorites" : "remove from favories"}`}>
            <i className={`fa-solid fa-heart ${(!user_favs.includes(id)) ? " active" : ''}`}></i>
          </abbr>
        </button>
      </div>
      <div className="comp_header">
        <h3>{name}</h3>
        <button onClick={() => evt_onclick_i(user_favs.includes(id))}>
          <abbr title="view in detail">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </abbr>
        </button>
      </div>
      <div className="comp_body">
        <p className="desc">{description}</p>
      </div>
    </div>;
  }
}

export default Recipe;