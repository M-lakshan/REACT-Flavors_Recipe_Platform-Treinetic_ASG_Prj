const InputField = ({ post_tag, cls_container, cls_label, cls_input, label_visible, label_value,
  input_visible, input_type, input_id, input_placeholder, input_value, evt_onlcick, evt_onchange }) => {

  return (
    <div className={`${cls_container.join(' ')} ${input_id}`}>
      {(label_visible) && <label htmlFor={input_id} className={cls_label.join(' ')}>{label_value}</label>}
      {(input_type=="textarea") ? <textarea 
        id={input_id} 
        className={cls_input.join(' ')} 
        placeholder={input_placeholder}
        value={input_value}
        onClick={(evt_onlcick) ? (e) => evt_onlcick(e) : () => null}
        onChange={(evt_onchange) ? (e) => evt_onchange(e) : () => null}
      /> : <input
        type={(input_visible) ? input_type : "hidden"} 
        id={input_id} 
        className={cls_input.join(' ')} 
        placeholder={input_placeholder}
        value={input_value}
        onClick={(evt_onlcick) ? (e) => evt_onlcick(e) : () => null}
        onChange={(evt_onchange) ? (e) => evt_onchange(e) : () => null}
      />}
      {(post_tag) && <span className="post_tag">{post_tag}</span>}
    </div>
  );
}

export default InputField;