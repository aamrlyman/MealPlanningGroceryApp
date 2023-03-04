import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useCustomForm from "../../hooks/useCustomForm";

const EditIngredients = ({
  ingredient,
  fetchIngredients,
  handleCancelClick,
  setEditIngredientId,
}) => {
  const [user, token] = useAuth();
  const { mealId } = useParams();
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    ingredient,
    editIngredients
  );

  formData.meal_id = mealId;
  async function editIngredients() {
    try {
      let response = await axios.put(
        `http://127.0.0.1:8000/api/ingredients/${ingredient.id}/`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      fetchIngredients();
      setEditIngredientId(null);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      {ingredient ? (
        <form onSubmit={handleSubmit} className="editIngredientForm">
          <table>
            <tbody>
              <tr className="editIngredientTr">
                <td>
                  <button
                    className="noBorder"
                    type="button"
                    onClick={() => handleCancelClick()}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </td>
                <td>
                  <input
                    className="ingredientNameInput"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  ></input>
                </td>
                <td>
                  <input
                    className="ingredientQuantityInput"
                    type="number"
                    name="quantity"
                    value={
                      formData.quantity > 0
                        ? formData.quantity
                        : (formData.quantity = 0)
                    }
                    onChange={handleInputChange}
                  ></input>
                </td>
                <td>
                  <input
                    className="ingredientUnitInput"
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                  ></input>
                </td>
                <td>
                  <button className="noBorder" type="submit">
                    <i className="fa-solid fa-floppy-disk"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default EditIngredients;
