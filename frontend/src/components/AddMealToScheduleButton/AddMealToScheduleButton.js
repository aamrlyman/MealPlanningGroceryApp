import axios from "axios";
import useAuth from "../../hooks/useAuth";

const AddMealToScheduleButton = ({ schedule, meal, getScheduledMeals }) => {
  const [user, token] = useAuth();

  const addMealToSchedule = async (schedule, meal, evnet) => {
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/schedules/${schedule.id}/`,
        {
          meal_id: meal.id,
          schedule_id: schedule.id,
          user_id: user.id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getScheduledMeals(schedule);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <button onClick={(event) => addMealToSchedule(schedule, meal, event)}>
      Add
    </button>
  );
};

export default AddMealToScheduleButton;
