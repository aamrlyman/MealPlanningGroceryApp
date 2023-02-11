import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";

let initialValues = {
  name: "",
  notes: "",
  url: "",
  prep_time_minutes: 0,
  prep_time_hours: 0,
  cook_time_minutes: 0,
  cook_time_hours: 0,
//   user_id: 2
};

const CreateMeal = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    initialValues,
    createMeal
  );

  async function createMeal() {
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/meals/user/`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // navigate
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
      <div>
      <form onSubmit={handleSubmit}>
        <label>Meal Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        ></input>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateMeal;
