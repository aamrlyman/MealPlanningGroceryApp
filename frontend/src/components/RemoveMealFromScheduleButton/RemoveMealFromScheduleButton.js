import axios from "axios";
import useAuth from "../../hooks/useAuth";

const RemoveMealFromScheduleButton = ({
  scheduledMealId,
  getScheduledMeals,
  scheduleId,
}) => {
  const [user, token] = useAuth();



  return (
    <button
      type="button"
      // onClick={() => removeMealFromSchedule(scheduledMealId)}
    >
      X
    </button>
  );
};

export default RemoveMealFromScheduleButton;
