import React from "react";
import "../index.css";

// 'checked' if the color mode is selected

const ToggleSwitch = ({ label, onToggle, mode }) => {
  return (
    <div className="container">
      <div className="toggle-switch">
        {mode === "green" ? (
          <input
            checked
            onClick={() => onToggle()}
            type="checkbox"
            className="checkbox"
            name={label}
            id={label}
          />
        ) : (
          <input
            check
            onClick={() => onToggle()}
            type="checkbox"
            className="checkbox"
            name={label}
            id={label}
          />
        )}

        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
