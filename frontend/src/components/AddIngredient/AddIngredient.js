import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";

let initialValues = {
  name: "",
  unit: "",
  quantity: 0,
  meal_id: null,
};

const AddIngredient = ({
  fetchIngredients,
  isAddIngredient,
  setIsAddIngredient,
}) => {
  const { mealId } = useParams();
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    initialValues,
    postIngredient
  );
  formData.meal_id = mealId;

  async function postIngredient() {
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/ingredients/meal_id/${mealId}/`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      fetchIngredients();
      reset();
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="addIngredientForm">
        <table>
          <tbody>
            <tr className="editIngredientTr">
              <td>
                <button
                  className="cancleEditIngredientButton"
                  type="button"
                  onClick={() => setIsAddIngredient(!isAddIngredient)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </td>
              <td className="ingredientNameTd">
                <label>
                  <input
                    className="ingredientNameInput"
                    type="text"
                    placeholder=" Ingredient Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  ></input>
                </label>
              </td>
              <td>
                <label>
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
                </label>
              </td>
              <td className="ingredientInputTd">
                <label>
                  <input
                    className="ingredientUnitInput"
                    placeholder="unit"
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                  ></input>
                </label>
              </td>
              <td>
                <button className="saveIngredientButton" type="submit">
                  <i className="fa-solid fa-floppy-disk"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddIngredient;
