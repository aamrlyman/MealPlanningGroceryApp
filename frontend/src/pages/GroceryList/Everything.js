import { useOutletContext, Link } from "react-router-dom";

const Everything = () => {
  const [groceryList, sortType] = useOutletContext();
  let counter = 1.111;
  let counter1 = 0;
  let counter2 = 0;
  return (
    <div className="everythingContainer">
      <table className="groceriesTable">
      <span style={{fontStyle: "italic", fontSize:".75rem"}}>*Checkboxes reset on refresh</span>
        <thead>
          <tr>
            <th className="groceriesTh">Ingredients</th>
            <th className="groceriesTh">Meals</th>
            <th className="groceriesTh"># of Meals</th>
            <th className="groceriesTh">Quantities</th>
          </tr>
        </thead>
        <tbody>
          {groceryList &&
            groceryList.map((item) => (
              <tr key={`${item.id} + ${(counter += 1.321)}`}>
                <td className="everythingTd">
                  <input type="checkbox" /> {item.name}
                </td>
                <td className="everythingTd">
                  {item &&
                    item.meals.map((meal) => (
                      <p className="mealNamesP" key={(counter2 += 1.2423)}>
                        <Link to={`/meal/${meal.id}`}>{meal.name}</Link>
                      </p>
                    ))}
                </td>
                <td className="mealCountTd">{item.meals.length}</td>
                <td className="everythingTd">
                  {/* <ol> */}
                  {item &&
                    item.meals.map((meal) => (
                      <p className="quantitiesP" key={(counter1 += 1.123)}>
                        {meal.quantity} {meal.unit}
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

export default Everything;
