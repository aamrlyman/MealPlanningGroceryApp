import axios from "axios";
import { useOutletContext } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RemoveMealFromScheduleButton = ({
  meal,
  getScheduledMeals,
  scheduledMeals,
  scheduleId,
  removeMealFromSchedule
}) => {
  const [user, token] = useAuth();



  return (
    <button
    className="noBorder"
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
   <i className="fa-regular fa-circle-xmark"></i>
  </button>
  );
};

export default RemoveMealFromScheduleButton;
