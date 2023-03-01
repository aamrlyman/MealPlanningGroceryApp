import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";
import UserMeal from "../../pages/UserMeal/UserMeal";
import "./EditMeal.css";
import Ingredients from "../../components/Ingredients/Ingredients";

const EditMeal = ({ setIsEdit, meal, fetchMeal }) => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const { mealId } = useParams();
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    meal,
    editMeal
  );

  async function editMeal() {
    try {
      let response = await axios.put(
        `http://127.0.0.1:8000/api/meals/${mealId}/`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      fetchMeal();
      setIsEdit(false);
      // navigate(`/userMeal/${mealId}`)
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="MealNameAndTimesContainer">
          <div className="editMealNameContainer">
            <label>Meal Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="editTimesContainer">
            <p>Prep Time</p>
            <label>Hours</label>
            <input
              type="number"
              name="prep_time_hours"
              value={formData.prep_time_hours}
              onChange={handleInputChange}
            ></input>
            <label>Minutes</label>
            <input
              type="number"
              name="prep_time_minutes"
              value={formData.prep_time_minutes}
              onChange={handleInputChange}
            ></input>
            <p>Cook Time</p>
            <label>Hours</label>
            <input
              type="number"
              name="cook_time_hours"
              value={formData.cook_time_hours}
              onChange={handleInputChange}
            ></input>
            <label>Minutes</label>
            <input
              type="number"
              name="cook_time_minutes"
              value={formData.cook_time_minutes}
              onChange={handleInputChange}
            ></input>
          </div>
        </div>
        <label>Notes</label>
        <textarea
          type="text"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
        ></textarea>
        <label>Recipe Link</label>
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleInputChange}
        ></input>
        <button type="submit">Save</button>
        <button type="button" onClick={() => setIsEdit(false)}>
          cancel
        </button>
      </form>
    </div>
  );
};

export default EditMeal;
