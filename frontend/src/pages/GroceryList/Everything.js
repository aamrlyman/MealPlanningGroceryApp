import { useOutletContext, Link } from "react-router-dom";

const Everything = () => {
  const [groceryList, sortType] = useOutletContext();
  let counter = 1.111;
  let counter1 = 0;
  let counter2 = 0;
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Ingredients</th>
            <th>Meals</th>
            <th>Quantities</th>
          </tr>
        </thead>
        <tbody>
          {groceryList &&
            groceryList.map((item) => (
              <tr key={`${item.id} + ${(counter += 1.321)}`}>
                <td>
                  <input type="checkbox" /> {item.name}
                </td>
                <td>
                  {/* <ol> */}
                  {item &&
                    item.meals.map((meal) => (
                      <p key={(counter2 += 1.2423)}>
                        <Link to={`/meal/${meal.id}`}>{meal.name}</Link>
                      </p>
                    ))}
                  {/* </ol> */}
                </td>
                <td>
                  {/* <ol> */}
                  {item &&
                    item.meals.map((meal) => (
                      <p key={(counter1 += 1.123)}>
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
