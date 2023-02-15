import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useCustomForm from "../../hooks/useCustomForm";



const EditIngredients = ({
  ingredient,
  fetchIngredients,
  handleCancelClick,
  setEditIngredientId
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
      setEditIngredientId(null)
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      {ingredient ? (
        <form onSubmit={handleSubmit}>
          <table key={ingredient.id}>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  ></input>
                </td>
                <td>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                  ></input>
                </td>
                <td>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                  ></input>
                </td>
                <td>
                  <button type="button" onClick={() => handleCancelClick()}>Cancel</button>
                </td>
                <td>
                  <button type="submit">Save</button>
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
