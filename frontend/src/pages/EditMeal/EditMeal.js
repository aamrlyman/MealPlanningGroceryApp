import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";
import UserMeal from "../UserMeal/UserMeal";
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
      <form onSubmit={handleSubmit} className="editMealForm">
        <div className="mealNameTimesButtonsContainer">
          <div className="editMealNameContainer">
            <label></label>
            <input
              className="editMealInput"
              placeholder="Meal Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="editTimesContainer">
            <label>
              <span className="pTitle">
                Prep: <span style={{ color: "#e6c593" }}>|</span>
              </span>
              <input
                type="number"
                name="prep_time_hours"
                value={
                  formData.prep_time_hours > 0
                    ? formData.prep_time_hours
                    : (formData.prep_time_hours = 0)
                }
                onChange={handleInputChange}
              ></input>
              <label>h </label>
              <input
                type="number"
                name="prep_time_minutes"
                value={
                  formData.prep_time_minutes > 0
                    ? formData.prep_time_minutes
                    : (formData.prep_time_minutes = 0)
                }
                onChange={handleInputChange}
              ></input>
              <label>m</label>
            </label>
            <br />
            <label>
              <span className="pTitle">Cook: </span>
              <input
                type="number"
                name="cook_time_hours"
                value={
                  formData.cook_time_hours > 0
                    ? formData.cook_time_hours
                    : (formData.cook_time_hours = 0)
                }
                onChange={handleInputChange}
              ></input>
              <label>h </label>
              <input
                type="number"
                name="cook_time_minutes"
                value={
                  formData.cook_time_minutes > 0
                    ? formData.cook_time_minutes
                    : (formData.cook_time_minutes = 0)
                }
                onChange={handleInputChange}
              ></input>
              <label>m</label>
            </label>
          </div>
          <div className="saveCancleButtonContainer">
            <div className="cancelButtonContainer">
              <button className="cancleSaveButtons" type="button" onClick={() => navigate("/userMealsList")}>
                <i className="fa-regular fa-rectangle-xmark"></i>
              </button>
            </div>
            <div className="saveButtonContainer">
              <button className="cancleSaveButtons" type="submit">
                <i className="fa-regular fa-floppy-disk"></i>
              </button>
            </div>
          </div>

          </div>
          <div className="editNotesURLContainer">
            <div className="editMealNotes">
              <label>
                <h3>Notes:</h3>
              </label>
              <textarea
                style={{"width":"288px", "height":"25vh"}}
                placeholder="Example: This recipe takes a lot longer to make than you think it will, but its worth it."
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="editURLContainer">
              <label className="editLinkLabel">
              <input
                className="editLinkInput"
                placeholder="https://www.allrecipes.com/recipe/8532956/dump-and-go-instant-pot-tortilla-soup/"
                type="text"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
              ></input>
              </label>
            </div>
        </div>
      </form>
  );
};

export default EditMeal;
