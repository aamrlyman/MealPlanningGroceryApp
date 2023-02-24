import axios from "axios";
import useAuth from "../../hooks/useAuth";

const AddMealToScheduleButton = ({ scheduleId, meal, getScheduledMeals }) => {
  const [user, token] = useAuth();

  const addMealToSchedule = async (scheduleId, meal) => {
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/schedules/${scheduleId}/`,
        {
          meal_id: meal.id,
          schedule_id: scheduleId,
          user_id: user.id,
        },
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
      className="noBorder"
      onClick={(event) => addMealToSchedule(scheduleId, meal)}
    >
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>{" "}
    </button>
  );
};

export default AddMealToScheduleButton;
