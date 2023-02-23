import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import RemoveMealFromScheduleButton from "../../components/RemoveMealFromScheduleButton/RemoveMealFromScheduleButton";
import DisplayTimes from "../../components/DisplayTimes/DisplayTimes";

const DisplayScheduledMeals = ({
  meal,
  getScheduledMeals,
  scheduleId,
  scheduledMeals,
  removeMealFromSchedule,
}) => {
  const [user, token] = useAuth();

  const isCookedToggle = async (scheduledMealId) => {
    try {
      let response = await axios.put(
        `http://127.0.0.1:8000/api/schedules/scheduled_meal/${scheduledMealId}/`,
        meal,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getScheduledMeals(scheduleId);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <tr>
      <td>
        {meal.is_Cooked ? (
          <button
            className="noBorder"
            type="submit"
            onClick={() => isCookedToggle(meal.id)}
          >
           <i className="fa-regular fa-square-check"></i>
          </button>
        ) : (
          <button
            className="noBorder"
            type="submit"
            onClick={() => isCookedToggle(meal.id)}
          >
            <i className="fa-regular fa-square"></i>
          </button>
        )}
      </td>
      <td>
        <Link to={meal && `/meal/${meal.meal.id}/`}>{meal.meal.name}</Link>
      </td>
      <td>
        <a href={meal.meal.url}>Recipe Link </a>
      </td>
      <td>
        <DisplayTimes meal={meal.meal} />
        <button
          className="noBorder"
          onClick={() =>
            removeMealFromSchedule(meal.id, scheduleId, getScheduledMeals)
          }
        >
          <i className="fa-regular fa-circle-xmark"></i>
        </button>
      </td>
    </tr>
  );
};
export default DisplayScheduledMeals;
