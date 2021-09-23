import React from "react";
import PropTypes from "prop-types";

function FormArea({ keys, idx, handleChange, formData }) {
  return (
    <div id={keys[idx]}>
      <label htmlFor={keys[idx]}>
        {keys[idx].charAt(0).toUpperCase() + keys[idx].slice(1)}
      </label>

      <br />

      {keys[idx] === "name" ? (
        <input
          name="name"
          id="name"
          type="text"
          onChange={handleChange}
          value={formData[keys[idx]]}
          style={{ width: "100%" }}
        />
      ) : (
        <textarea
          name={keys[idx]}
          id={keys[idx]}
          onChange={handleChange}
          value={formData[keys[idx]]}
          style={{ width: "100%" }}
          rows="4"
        />
      )}
    </div>
  );
}

FormArea.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  idx: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default FormArea;
