import { useOutletContext, Link } from "react-router-dom";

const MealNames = () => {
    const [groceryList, sortType] = useOutletContext();
    let counter = 0;
    let counter2 = 0; 
    return (
        <div>
    {sortType === "+MealNames" ? (
        <table>
          <thead>
            <tr>
              <th>Ingredients</th>
              <th>Meals</th>
              <th>Meal Names</th>
            </tr>
          </thead>
          <tbody>
            {groceryList &&
              groceryList.map((item) => (
                <tr key={`${item.id} + ${counter +=1.98989}`}>
                  <td><input type="checkbox"/> {item.name}</td>
                  <td>{item.meals.length}</td>
                  <td>
                  {item && item.meals.map((meal)=>
                   <p key={`${counter2 +=.1233}`}><Link to={`/meal/${meal.id}`}>{meal.name}</Link></p> 
                  )}
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
 
export default MealNames;