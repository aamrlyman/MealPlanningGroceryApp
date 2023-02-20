import { useOutletContext } from "react-router-dom";

const IngredientsOnly = () => {
  const [groceryList, sortType] = useOutletContext();
  let counter = 1.1;
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {groceryList &&
            groceryList.map((item) => (
              <tr key={`${item.id} + ${(counter += 0.12312)} `}>
                <td>
                  <input type="checkbox" /> {item.name}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientsOnly;
