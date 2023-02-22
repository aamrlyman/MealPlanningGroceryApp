
const DisplayTimes = ({meal}) => {
    return (
        <div className="displayTimes">
        <p>
        Prep:{" "}
        {meal.prep_time_hours === 0
          ? " "
          : meal.prep_time_hours + "h"}{" "}
        {meal.prep_time_minutes === 0
          ? " "
          : meal.prep_time_minutes + "m"}
      </p>
      <p>
        Cook:{" "}
        {meal.cook_time_hours === 0
          ? " "
          : meal.cook_time_hours + "h"}{" "}
        {meal.prep_time_minutes === 0
          ? " "
          : meal.prep_time_minutes + "m"}
      </p>
        </div>
      );
}
 
export default DisplayTimes;
