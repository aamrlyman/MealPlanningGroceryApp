import axios from "axios";
import useAuth from "../../hooks/useAuth";

const RemoveMealFromScheduleButton = ({meal, getScheduledMeals, schedule}) => {
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
          getScheduledMeals(schedule);
          console.log(response);
        } catch (error) {
          console.log(error.message);
        }
      };


    return (
        <button type="submit" onClick={() => removeMealFromSchedule(meal.id)}>
        X
      </button>
      );
}
 
export default RemoveMealFromScheduleButton;
