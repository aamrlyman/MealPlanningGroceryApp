import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";


let initialValues = {
    name: "",
    unit: "",
    quantity: 0,
    meal_id:null
};

const AddIngredient = ({ fetchIngredients, isAddIngredient, setIsAddIngredient }) => {
  const {mealId} = useParams();
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
        `http://127.0.0.1:8000/api/ingredients/meal_id/${mealId}/`
        ,
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
      <form onSubmit={handleSubmit}>
        <label>ingredient Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        ></input>
    <label>quantity</label>
        <input
          type="number"
          name="quantity"
          value={(formData.quantity > 0) ? formData.quantity: formData.quantity=0 }
          onChange={handleInputChange}
        ></input>
        <label>unit</label>
        <input
          type="text"
          name="unit"
          value={formData.unit}
          onChange={handleInputChange}
        ></input>

        <button type="submit">Add</button>
        <button type="button" onClick={()=>setIsAddIngredient(!isAddIngredient)}>X</button>
      </form>
    </div>
  );
};

export default AddIngredient;
