const BtnDeleteOrCancel = ({ type, evt_onclick }) => {
  let cls_tag = (type=="del") ? "trash-can" : ((type=="bkspc") ? "delete-left" : "circle-xmark");

  return <button className={`btn_${(type=="del") ? "del" : "cancel"}`} onClick={(evt_onclick) ? (e) => evt_onclick(e) : () => null}><i className={`fa-solid fa-${cls_tag}`}></i></button>;
}

export default BtnDeleteOrCancel;