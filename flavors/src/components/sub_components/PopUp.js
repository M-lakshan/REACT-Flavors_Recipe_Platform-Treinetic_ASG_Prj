import React from 'react';
import BtnDeleteOrCancel from './BtnDeleteOrCancel';

const PopUp = ({title, message, theme, evt_onclick}) => {

  return (
    <div
      id="popup_component" 
      className={`status_message ${theme}_mode ${title.toLowerCase()}`}
    >
      <p className="comp_header">
        <span>{title}</span>
        {(title != "confirmation") && <BtnDeleteOrCancel type="cancel" evt_onclick={() => evt_onclick(null)} />}
      </p>
      <p className="comp_msg">{message}</p>
      <p className="comp_footer">
        {(title == "confirmation") && <button className="btn_ok" onClick={() => evt_onclick(null)}>OK</button>}
      </p>
    </div>
  );
};

export default PopUp;
