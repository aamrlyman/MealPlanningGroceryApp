import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import DisplayUserMealsList from "../../components/DisplayMealsList/DisplayUserMealsList";
import useAuth from "../../hooks/useAuth";
import { useOutletContext } from "react-router-dom";

const UserMealsList = () => {
  const [schedule, scheduledMeals, getScheduledMeals, removeMealFromSchedule] =
    useOutletContext();
  const [meals, setMeals] = useState();
  const [user, token] = useAuth();
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/meals/user/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setMeals(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="tableContainter">
      <table>
        <thead>
          <tr>
            <th>Scheduled</th>
            <th>Meal</th>
            <th>Recipe Url</th>
            <th>Time</th>
            <th>Add
              <button type="button" onClick={() => setIsDelete(!isDelete)}>
              <i className="fa-regular fa-trash-can"></i>
              </button>
            </th>
            {/* <th>
            </th> */}
          </tr>
        </thead>
        <tbody>
          {meals &&
            meals.map((meal) => (
              <Fragment key={meal.id}>
                <DisplayUserMealsList
                  meal={meal}
                  scheduleId={ schedule && schedule.id}
                  scheduledMeals={scheduledMeals}
                  getScheduledMeals={getScheduledMeals}
                  isDelete={isDelete}
                  fetchMeals={fetchMeals}
                  removeMealFromSchedule={removeMealFromSchedule}
                />
              </Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserMealsList;
