import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import DisplayMealsList from "../../components/DisplayMealsList/DisplayMealsList";
import { useOutletContext } from "react-router-dom";
import "./AllMealsList.css"
const AllMealsList = () => {
  const [schedule, scheduledMeals, getScheduledMeals, removeMealFromSchedule] = useOutletContext();
  const [meals, setMeals] = useState();
  
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/meals/");
        setMeals(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMeals();
  }, []);

  return (
    <div className="tableContainter">
      <table>
        <thead>
          <tr>
            <th>Scheduled</th>
            <th>Meal</th>
            <th>Recipes</th>
            <th>Time</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {meals &&
            meals.map((meal) => (
              <Fragment key={meal.id}>
                <DisplayMealsList
                  meal={meal}
                  scheduleId={schedule && schedule.id}
                  scheduledMeals={scheduledMeals}
                  getScheduledMeals={getScheduledMeals}
                  removeMealFromSchedule={removeMealFromSchedule}
                />
              </Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllMealsList;
