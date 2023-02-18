import { useOutletContext, Link } from "react-router-dom";

const MealCount = () => {
    const [groceryList, sortType] = useOutletContext();
   let counter = 1;
   let counter2 = 0;
    return (
        <div>
      {sortType === "+quantities" ? (
        <table>
          <thead>
            <tr>
              <th>Ingredients</th>
              <th>Quantities</th>
            </tr>
          </thead>
          <tbody>
            {groceryList &&
              groceryList.map((item) => (
                <tr key={`${item.id} + ${counter +=1.123}`}>
                  <td><input type="checkbox"/> {item.name}</td>
                  <td>
                    {/* <ol> */}
                  {item && item.meals.map((meal)=>
                   <p key={counter +=.123}><Link to={`/meal/${meal.id}`}>{meal.quantity} {meal.unit}</Link></p> 
                  )}
                    {/* </ol> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
        </div>
    
      );
}
 
export default MealCount;