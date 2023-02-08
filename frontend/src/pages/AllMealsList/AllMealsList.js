import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import DisplayMealsList from "../../components/DisplayMealsList/DisplayMealsList";

const AllMealsList = ({ schedule, getScheduledMeals, scheduledMeals }) => {
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
    <div>
      <table>
        <thead>
          <tr>
            <th>Scheduled</th>
            <th>Meal</th>
            <th>Recipe Url</th>
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
                  schedule={schedule}
                  scheduledMeals={scheduledMeals}
                  getScheduledMeals={getScheduledMeals}
                />
              </Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllMealsList;
