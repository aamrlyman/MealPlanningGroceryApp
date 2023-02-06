import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const DisplayScheduledMeals = (props) => {
  return (
    <tr>
      <td>
        <input type="checkbox" value={props.meal.is_Cooked}></input>
      </td>
      <td>{props.meal.meal.name}</td>
      <td><a href="{props.meal.meal.url}">Recipe Link </a></td>
      <td>
        prep time: {props.meal.meal.prep_time_hours} hrs,{" "} {props.meal.meal.prep_time_minutes} min. 
        cook time:{" "} {props.meal.meal.cook_time_hours} hrs, {props.meal.meal.prep_cook_minutes}{" "} min
        <button>X</button>
      </td>
    </tr>
  );
};
export default DisplayScheduledMeals;
