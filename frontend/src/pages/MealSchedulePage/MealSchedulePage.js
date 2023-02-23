import React, { useState, useEffect, Fragment, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import DisplayScheduledMeals from "../../components/DisplayScheduledMeals/DisplayScheduledMeals";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
// import ScheduleIdContext from "../../context/scheduleIdContext";

const MealSchedulePage = () => {
  const [user, token] = useAuth();
  const [
    schedule,
    scheduledMeals,
    getScheduledMeals,
    removeMealFromSchedule,
    clearSchedule,
  ] = useOutletContext();

  return (
    <div>
      {/* {schedule ? (
        <h1>Schedule_id: {schedule.id}</h1>
      ) : (
        <h1>No Schedule created yet</h1>
      )} */}
      {!scheduledMeals ? (
        <div>
          Click on the All Meals Link above to add some meals to your meal plan!
          Or Click on the + to add some of your own.
        </div>
      ) : (
        <div className="tableContainter">
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
                      removeMealFromSchedule={removeMealFromSchedule}
                    />
                  </Fragment>
                ))}
            </tbody>
          </table>
          <button
            className="noBorder"
            type="submit"
            onClick={() => clearSchedule(schedule)}
          >
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default MealSchedulePage;
