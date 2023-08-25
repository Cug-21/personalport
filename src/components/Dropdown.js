import React from 'react';

function Dropdown({ options, onSelect, onClose }) {
  return (
    <div className="dropdown-content">
      <div className="dropdown-close" onClick={onClose}>Close</div>
      {options.map((option, index) => (
        <div key={index} onClick={() => {
          onSelect(option);
        }}>
          {option}
        </div>
      ))}
    </div>
  );
}

export default Dropdown;