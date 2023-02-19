import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditMeal from "../../components/EditMeal/EditMeal";
import DisplayUserMeal from "../../components/DisplayUserMeal/DisplayUserMeal";
import Ingredients from "../../components/Ingredients/Ingredients";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const UserMeal = () => {
  const [schedule, scheduledMeals, getScheduledMeals, removeMealFromSchedule] =
    useOutletContext();

  const [user, token] = useAuth();
  const { mealId } = useParams();
  const [meal, setMeal] = useState();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchMeal();
  }, []);

  const fetchMeal = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/meals/${mealId}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setMeal(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {isEdit ? (
        <EditMeal meal={meal} setIsEdit={setIsEdit} fetchMeal={fetchMeal} />
      ) : (
        <DisplayUserMeal
          meal={meal}
          scheduleId={schedule && schedule.id}
          getScheduledMeals={getScheduledMeals}
          scheduledMeals={scheduledMeals}
          setIsEdit={setIsEdit}
          removeMealFromSchedule={removeMealFromSchedule}
        />
      )}
      
      {meal && (
        <div>
          <h2>Ingredients</h2>
          <Ingredients key={mealId + "ing"} meal={meal} />
        </div>
      )}
    </div>
  );
};

export default UserMeal;
