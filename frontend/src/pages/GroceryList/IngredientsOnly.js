import { Fragment, useState } from "react";
import { useOutletContext } from "react-router-dom";

const IngredientsOnly = () => {
  const [groceryList, sortType] = useOutletContext();
  let counter = 1.1;
  return (
    <div className="ingredientsOnlyContainer">
      <h3>Ingredients</h3>
      <ul>
        {groceryList &&
          groceryList.map((item) => (
            <Fragment key={`${item.id} + ${(counter += 0.12312)} `}>
              <li className="groceriesLi">
                <input type="checkbox" /> {item.name}
              </li>
            </Fragment>
          ))}
      </ul>
    </div>
  );
};

export default IngredientsOnly;
