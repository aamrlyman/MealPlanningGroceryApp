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
    <div>
      {ingredient ? (
        <Fragment>
          <li key={ingredient.id}>
            {" "}
            {ingredient.quantity === 0 ? " " : ingredient.quantity}{" "}
            {ingredient.unit === "na" ? " " : ingredient.unit} {ingredient.name}
            <button onClick={() => handleEditClick(ingredient)}>Edit</button>
            <button type="button" onClick={() => deleteIngredient(ingredient)}>
              Delete
            </button>
          </li>
        </Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default DisplayIngredients;
