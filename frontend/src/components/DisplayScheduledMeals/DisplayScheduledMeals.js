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
      <td className="isCooked">
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
      <td className="mealTd">
        <Link to={meal && `/meal/${meal.meal.id}/`}>{meal.meal.name}</Link>
      </td>
      <td>
        <a href={meal.meal.url}>{meal.meal.name} recipe Link </a>
      </td>
      <td className="displaytimesTd">
        <div className="displayTimesContainer">
          <DisplayTimes meal={meal.meal} />
          <div className="removeButton">
            <button
              className="noBorder"
              onClick={() =>
                removeMealFromSchedule(meal.id, scheduleId, getScheduledMeals)
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};
export default DisplayScheduledMeals;
