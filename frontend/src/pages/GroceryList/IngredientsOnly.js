import { Fragment, useState } from "react";
import { useOutletContext } from "react-router-dom";

const IngredientsOnly = () => {
  const [groceryList, sortType] = useOutletContext();
  let counter = 1.1;
  return (
    <div className="ingredientsOnlyContainer">
      <table className="groceriesTable">
         <span style={{fontStyle: "italic", fontSize:".75rem"}}>*Checkboxes reset on refresh</span>
        <thead>
          <tr>
            <th className="groceriesTh">Ingredients</th>
          </tr>
        </thead>
        {groceryList &&
          groceryList.map((item) => (
            <tr key={`${item.id} + ${(counter += 0.12312)} `}>
              <td className="groceriesTd">
                <input type="checkbox" /> {item.name}
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default IngredientsOnly;
