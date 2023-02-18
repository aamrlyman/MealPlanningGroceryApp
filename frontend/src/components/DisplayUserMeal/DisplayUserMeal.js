import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import IsScheduledIcon from "../IsScheduledIcon/IsScheduledIcon";
import AddMealToScheduleButton from "../AddMealToScheduleButton/AddMealToScheduleButton";
import DeleteUserMeal from "../DeleteMeal/DeleteMeal";
// import RemoveMealFromScheduleButton from "../RemoveMealFromScheduleButton/RemoveMealFromScheduleButton";
import { useNavigate } from "react-router-dom";

const DisplayUserMeal = ({setIsEdit, meal, scheduleId, getScheduledMeals, scheduledMeals }) => {
  const [user, token] = useAuth();
  const { mealId } = useParams();
  const navigate = useNavigate();

  const deleteMeal = async () => {
    try {
      let response = await axios.delete(
        `http://127.0.0.1:8000/api/meals/${mealId}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/userMealsList/")
      console.log(response);
    } catch (error) {
      console.log(error.message);
      alert("You can't delete a meal that is being used on a schedule");
    }
  };


  return (
    <div>
      <div>
        <IsScheduledIcon scheduledMeals={scheduledMeals} meal={meal} />
      </div>
      <div>
        <h1>{meal && meal.name}</h1>
      <button type="button" onClick={()=>setIsEdit(true)}>Edit</button>
      </div>
      {meal ? (
        <div>
          <p>
            Prep time {meal.prep_time_hours} hrs, {meal.prep_time_minutes} min
          </p>
          <p>
            Cook time {meal.cook_time_hours} hrs, {meal.cook_time_minutes} min
          </p>
    
        </div>
      ) : (
        ""
      )}
      <div>
        <p>{meal && meal.notes}</p>
      </div>
      <div>
        <a href={meal && meal.url}> Recipe Link</a>
        <div>
        { meal &&
           <AddMealToScheduleButton
           meal={meal}
           scheduleId={scheduleId} 
           getScheduledMeals={getScheduledMeals}
         />
      }
        </div>
      </div>
      <DeleteUserMeal meal={meal}/>
    </div>
  );
};

export default DisplayUserMeal;

//I eventually want to be able to remove a meal from the meal list while in meal 
//I ran into race conditions so I tabled that for now. 
/* {scheduledMeals &&
scheduledMeals.some((sMeal) => sMeal.meal.id == mealId) ? (
  <RemoveMealFromScheduleButton
    scheduledMeals={scheduledMeals}
    meal={
      scheduledMeals &&
      scheduledMeals.filter((m) => m.meal.id === mealId)[0]
    }
    schedule={schedule}
    getScheduledMeals={getScheduledMeals}
  />
) : (
  <AddMealToScheduleButton
    scheduledMeals={scheduledMeals}
    meal={meal}
    schedule={schedule}
    getScheduledMeals={getScheduledMeals}
  />
)} */