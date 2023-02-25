import { useOutletContext } from "react-router-dom";
import { Fragment } from "react";

const MealCount = () => {
  const [groceryList, sortType] = useOutletContext();
  let counter = 0;
  return (
    <div className="mealCountContainer">
      <h3> Ingredient, # of Meals</h3>
      <ul>
        {groceryList &&
          groceryList.map((item) => (
            <Fragment key={`${item.id} + ${(counter += 1.1)}`}>
              <li className="groceriesLi">
                <input type="checkbox" /> {item.name}, {item.meals.length}
              </li>
            </Fragment>
          ))}
      </ul>
    </div>
  );
};

export default MealCount;
