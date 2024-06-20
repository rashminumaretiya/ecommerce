import React from "react";

const Quantity = ({ value, handlePlusClick, handleMinusClick }) => {
  return (
    <div className="qty">
      <button
        className="qtyminus"
        aria-hidden="true"
        onClick={handleMinusClick}
      >
        -
      </button>
      <input
        type="text"
        name="qty"
        id="qty"
        min="1"
        max="10"
        step="1"
        value={value}
        readOnly
      />
      <button className="qtyplus" aria-hidden="true" onClick={handlePlusClick}>
        +
      </button>
    </div>
  );
};

export default Quantity;
