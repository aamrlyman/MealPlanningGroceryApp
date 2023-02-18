import React, { useState, useEffect, Fragment, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import DisplayScheduledMeals from "../../components/DisplayScheduledMeals/DisplayScheduledMeals";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
// import ScheduleIdContext from "../../context/scheduleIdContext";

const MealSchedulePage = ({ schedule, scheduledMeals, getScheduledMeals }) => {
  const [user, token] = useAuth();
  const [testContext, setTestContext] = useOutletContext();

  const clearSchedule = async (schedule) => {
    try {
      let response = await axios.delete(
        `http://127.0.0.1:8000/api/schedules/${schedule.id}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
        )
        getScheduledMeals(schedule)
        console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div>
      {/* {schedule ? (
        <h1>Schedule_id: {schedule.id}</h1>
      ) : (
        <h1>No Schedule created yet</h1>
      )} */}
      <table>
        <thead>
          <tr>
            <th>Cooked</th>
            <th>Meal</th>
            <th>Recipe URL</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {scheduledMeals &&
            scheduledMeals.map((meal) => (
              <Fragment key={meal.id}>
                <DisplayScheduledMeals
                  meal={meal}
                  getScheduledMeals={getScheduledMeals}
                  scheduleId={schedule.id}
                  scheduledMeals={scheduledMeals}
                />
              </Fragment>
            ))}
        </tbody>
      </table>
      <button type="submit" onClick={()=>clearSchedule(schedule)}>Clear Schedule</button>
    </div>
  );
};

export default MealSchedulePage;
