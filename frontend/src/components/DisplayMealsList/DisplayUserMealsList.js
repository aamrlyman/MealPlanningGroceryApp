import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import IsScheduledIcon from "../IsScheduledIcon/IsScheduledIcon";
import AddMealToScheduleButton from "../AddMealToScheduleButton/AddMealToScheduleButton";
import { Link } from "react-router-dom";
import DeleteUserMeal from "../DeleteMeal/DeleteMeal";
import DisplayTimes from "../DisplayTimes/DisplayTimes";
import RemoveMealFromScheduleButton from "../RemoveMealFromScheduleButton/RemoveMealFromScheduleButton";

const DisplayUserMealList = ({
  scheduleId,
  meal,
  getScheduledMeals,
  scheduledMeals,
  isDelete,
  fetchMeals,
  removeMealFromSchedule,
}) => {
  const [user, token] = useAuth();

  return (
    <tr>
      <td>
        <IsScheduledIcon scheduledMeals={scheduledMeals} meal={meal} />
      </td>
      <td>
        <Link to={meal && `/userMeal/${meal.id}/`}> {meal.name}</Link>
      </td>
      <td>
        <a href={meal.url}>Recipe Link </a>
      </td>
      <td>
      {meal ? (
       <DisplayTimes meal={meal} />
      ) : (
        ""
      )}
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
      {isDelete && meal && (
        <td>
          <DeleteUserMeal meal={meal} fetchMeals={fetchMeals} />
        </td>
      )}
    </tr>
  );
};
export default DisplayUserMealList;
