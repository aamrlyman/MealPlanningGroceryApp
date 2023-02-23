import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import IsScheduledIcon from "../IsScheduledIcon/IsScheduledIcon";
import AddMealToScheduleButton from "../AddMealToScheduleButton/AddMealToScheduleButton";
import DisplayTimes from "../DisplayTimes/DisplayTimes";
import { Link } from "react-router-dom";
import RemoveMealFromScheduleButton from "../RemoveMealFromScheduleButton/RemoveMealFromScheduleButton";

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
          <RemoveMealFromScheduleButton
            meal={meal}
            scheduledMeals={scheduledMeals}
            getScheduledMeals={getScheduledMeals}
            removeMealFromSchedule={removeMealFromSchedule}
            scheduleId={scheduleId}
          />
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
