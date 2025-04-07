const BtnDeleteOrCancel = ({ type, evt_onlcick }) => {
  let cls_tag = (type=="del") ? "trash-can" : ((type=="bkspc") ? "delete-left" : "circle-xmark");

  return <button onClick={(evt_onlcick) ? (e) => evt_onlcick(e) : () => null}><i className={`fa-solid fa-${cls_tag}`}></i></button>;
}

export default BtnDeleteOrCancel;