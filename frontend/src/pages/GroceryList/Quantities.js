import { useOutletContext, Link } from "react-router-dom";

const MealCount = () => {
  const [groceryList, sortType] = useOutletContext();
  let counter = 1;
  let counter2 = 0;
  return (
    <div className="quantitiesContainer">
      <table className="groceriesTable">
      <span style={{fontStyle: "italic", fontSize:".75rem"}}>*Checkboxes reset on refresh</span>
        <thead>
          <tr>
            <th className="groceriesTh">Ingredients</th>
            <th className="groceriesTh">Quantities</th>
          </tr>
        </thead>
        <tbody>
          {groceryList &&
            groceryList.map((item) => (
              <tr key={`${item.id} + ${(counter += 1.123)}`}>
                <td className="quantitiesTd">
                  <input type="checkbox" /> {item.name}
                </td>
                <td className="quantitiesTd">
                  {/* <ol> */}
                  {item &&
                    item.meals.map((meal) => (
                      <p className="quantitiesP" key={(counter += 0.123)}>
                        <Link to={`/meal/${meal.id}`}>
                          {meal.quantity === 0 ? "" : meal.quantity}{" "}
                          {meal.unit === "na" ? "" : meal.unit}
                        </Link>
                      </p>
                    ))}
                  {/* </ol> */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MealCount;
