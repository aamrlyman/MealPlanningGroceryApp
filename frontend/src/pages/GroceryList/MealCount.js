import { useOutletContext } from "react-router-dom";

const MealCount = () => {
    const [groceryList, sortType] = useOutletContext();
    let counter = 0;
    return (
        <div>
         {sortType === "+MealCount" ? (
        <table>
          <thead>
            <tr>
              <th>Ingredients</th>
              <th>Meals</th>
            </tr>
          </thead>
          <tbody>
            {groceryList &&
              groceryList.map((item) => (
                <tr key={`${item.id} + ${counter+=1.1}`}>
                  <td><input type="checkbox"/> {item.name}</td>
                  <td>{item.meals.length}</td>
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