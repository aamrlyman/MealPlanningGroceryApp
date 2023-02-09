import React, { useState, useEffect } from "react";
import DisplayIngredients from "../../components/DisplayIngredients/DisplayIngredients";

const DisplayMeal = (props) => {
  return (
    <div>
      <div>
        <i className="fa-regular fa-square"></i>
        <i className="fa-solid fa-check"></i>
      </div>
      <div>
        <h1>Meal Name</h1>
      </div>
      <div>
        <p>Prep time</p>
        <p>Cook time</p>
      </div>
    <DisplayIngredients />
      <div>
        <p>Notes about recipe</p>
      </div>
      <div>
        <a href="">Link</a>
        <input></input>
      </div>
      <button>Add</button>
    </div>
  );
};

export default DisplayMeal;
