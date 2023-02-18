import axios from "axios";
import useAuth from "../../hooks/useAuth";

const RemoveMealFromScheduleButton = ({
  scheduledMealId,
  getScheduledMeals,
  scheduleId,
}) => {
  const [user, token] = useAuth();

  const removeMealFromSchedule = async (scheduledMealId) => {
    try {
      let response = await axios.delete(
        `http://127.0.0.1:8000/api/schedules/scheduled_meal/${scheduledMealId}/`,
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
    <button
      type="button"
      onClick={() => removeMealFromSchedule(scheduledMealId)}
    >
      X
    </button>
  );
};

export default RemoveMealFromScheduleButton;
