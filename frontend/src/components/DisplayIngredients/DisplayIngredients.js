import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const DisplayIngredients = ({
  ingredient,
  fetchIngredients,
  handleEditClick,
}) => {
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
    <Fragment>
      {ingredient ? (
          <tr className="ingredientLi" key={ingredient.id}>
            <td>
          <button
            className="editIngredientButton"
            onClick={() => handleEditClick(ingredient)}
            >
            <i className="fa-solid fa-pencil"></i>
          </button>
            </td>
            <td>
          {ingredient.quantity === 0 ? "" : ingredient.quantity}{" "}
          {ingredient.unit === "" ? "" : ingredient.unit} {ingredient.name}              
            </td>
            <td>
          <button
            className="deleteIngredientButton"
            type="button"
            onClick={() => deleteIngredient(ingredient)}
            >
            <i className="fa-solid fa-trash-can"></i>
          </button>
            </td>
          </tr>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default DisplayIngredients;
