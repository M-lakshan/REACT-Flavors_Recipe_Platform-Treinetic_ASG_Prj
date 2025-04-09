const BtnAdd = ({ type, evt_onlcick, post_info, cls_alt='', revert=false }) => {
  let cls_tag = (type=="add") ? "plus" : ((revert) ? "chevron-down" : "chevron-up");

  return <button className={`btn_${type} ${cls_alt}`}
    onClick={(evt_onlcick) ? (e) => evt_onlcick(e) : () => null}>
    <i className={`fa-solid fa-circle-${cls_tag}`}></i>
    {(post_info) && <span>&nbsp;add {post_info}</span>}  
  </button>;
}

export default BtnAdd;