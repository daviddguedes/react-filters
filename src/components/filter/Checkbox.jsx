import React from "react";
import shortid from "shortid";

const Checkbox = ({ items, handleCheckboxChange, label, title }) => {
  const handleChange = (item) => {
    item.checked = !item.checked;
    handleCheckboxChange(items);
  };

  return (
    <div>
      <h4 className="title-checkbox">{title}</h4>
      {items.map((item) => (
        <div className="checkbox" key={shortid.generate()}>
          <label>
            <input
              type="checkbox"
              value={item.label}
              checked={item.checked}
              onChange={() => handleChange(item)}
            />
            <span>{item[label]}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Checkbox;
