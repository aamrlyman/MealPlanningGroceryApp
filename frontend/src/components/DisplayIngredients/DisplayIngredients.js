import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const DisplayIngredients = ({ ingredient, fetchIngredients }) => {
  const [user, token] = useAuth();
  const { mealId } = useParams();

  const deleteIngredient = async (ingredient) => {
    try {
      let response = await axios.delete(
        `http://127.0.0.1:8000/api/ingredients/${ingredient.id}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      fetchIngredients();
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <table>
        <tbody>
         { ingredient? 
          <tr key={ingredient.id}>
            <td>{ingredient.name}</td>
            <td>
              : {ingredient.quantity}, {ingredient.unit}
            </td>
            <td>
              <button>Edit</button>
            </td>
            <td>
              <button type="submit" onClick={() => deleteIngredient(ingredient)} >Delete</button>
            </td>
          </tr>
          :
          ""
         } 
        </tbody>
      </table>
    </div>
  );
};

export default DisplayIngredients;
