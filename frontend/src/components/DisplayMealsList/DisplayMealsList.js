import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import IsScheduledIcon from "../IsScheduledIcon/IsScheduledIcon";
import AddMealToScheduleButton from "../AddMealToScheduleButton/AddMealToScheduleButton";
import DisplayTimes from "../DisplayTimes/DisplayTimes";
import { Link } from "react-router-dom";

const DisplayScheduledMeals = ({
  scheduleId,
  meal,
  getScheduledMeals,
  scheduledMeals,
  removeMealFromSchedule,
}) => {
  const [user, token] = useAuth();

  return (
    <tr>
      <td>
        <IsScheduledIcon scheduledMeals={scheduledMeals} meal={meal} />
      </td>
      <td>
        <Link to={meal && `/meal/${meal.id}/`}> {meal.name}</Link>
      </td>
      <td>
        <a href={meal.url}>Recipe Link </a>
      </td>
      <td>
     <DisplayTimes meal={meal} />
      </td>
      <td>
        {meal &&
        scheduledMeals &&
        scheduledMeals.some((sMeal) => sMeal.meal.id == meal.id) ? (
          <button
            type="button"
            onClick={() =>
              removeMealFromSchedule(
                scheduledMeals.filter((sMeal) => sMeal.meal.id === meal.id)[0]
                  .id,
                scheduleId,
                getScheduledMeals
              )
            }
          >
            X
          </button>
        ) : (
          <AddMealToScheduleButton
            scheduleId={scheduleId}
            scheduledMeals={scheduledMeals}
            meal={meal}
            getScheduledMeals={getScheduledMeals}
          />
        )}
      </td>
    </tr>
  );
};
export default DisplayScheduledMeals;
