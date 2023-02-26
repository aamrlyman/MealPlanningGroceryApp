import { useOutletContext, Link } from "react-router-dom";

const MealNames = () => {
  const [groceryList, sortType] = useOutletContext();
  let counter = 0;
  let counter2 = 0;
  return (
    <div className="mealNamesContainer">
      <table className="groceriesTable">
      <span style={{fontStyle: "italic", fontSize:".75rem"}}>*Checkboxes reset on refresh</span>
        <thead>
          <tr>
            <th className="groceriesTh">
              Ingredients
            </th>
            <th className="groceriesTh">
              Meal Names
              </th>
            {/* <th className="groceriesTh">
              # of Meals
              </th> */}
          </tr>
        </thead>
        <tbody>
          {groceryList &&
            groceryList.map((item) => (
              <tr key={`${item.id} + ${(counter += 1.98989)}`}>
                <td className="ingredientMealNamesTd">
                  <input type="checkbox" /> {item.name}
                </td>
                <td className="mealNamesTd">
                  {item &&
                    item.meals.map((meal) => (
                      <p className="mealNamesP" key={`${(counter2 += 0.1233)}`}>
                        <Link to={`/meal/${meal.id}`}>{meal.name}</Link>
                      </p>
                    ))}
                </td>
                    {/* <td className="mealNamesTd">{item.meals.length}</td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MealNames;
