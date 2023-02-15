import React, { useState, useEffect } from "react";
import DisplayIngredients from "../../components/DisplayIngredients/DisplayIngredients";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import IsScheduledIcon from "../../components/IsScheduledIcon/IsScheduledIcon";
import AddMealToScheduleButton from "../../components/AddMealToScheduleButton/AddMealToScheduleButton";
import RemoveMealFromScheduleButton from "../../components/RemoveMealFromScheduleButton/RemoveMealFromScheduleButton";

const GroceryList = ({ schedule, getScheduledMeals, scheduledMeals }) => {
  const [user, token] = useAuth();
  const { mealId } = useParams();
  const [groceryList, setGroceryList] = useState();
  const [sortType, setSortType] = useState("ingredientsOnly");

  function eliminateDuplicates(arr) {
    let namesOnly = arr.map((el) => el.name.toLowerCase());
    let result = namesOnly
      .filter((name, index) => namesOnly.indexOf(name) === index)
      .sort();
    return result;
  }

  function buildObjects(name, array) {
    let obj = {
      name: "",
      meals: [
        {
          name: "",
          id: null,
          unit: "",
          quantity: null,
        },
      ],
    };
    for (const index in array) {
      if (array[index].name.toLowerCase() === name) {
        obj.name = name;
        obj.meals.push({
          name: array[index].meal.name,
          id: array[index].meal.id,
          unit: array[index].unit,
          quantity: array[index].quantity,
        });
      }
    }
    obj.meals.shift();
    return obj;
  }

  function sortedGroceryList(array) {
    let namesOnly = eliminateDuplicates(array);
    let finalList = [];
    for (const index in namesOnly) {
      finalList.push(buildObjects(namesOnly[index], array));
    }
    return finalList;
  }

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/ingredients/grocery_list/1/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setGroceryList(sortedGroceryList(response.data));
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchGroceries();
  }, []);
  //   console.log(scheduledMeals.filter( (m)=> m.meal.id===mealId))

  return (
    <div>
      <ul>
        <li>
          <button type="button" onClick={() => setSortType("ingredientsOnly")}>
            Ingredients Only
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setSortType("+MealCount")}>
            +MealCount
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setSortType("+MealNames")}>
            +Meal Names
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setSortType("+quantities")}>
            +Quantities
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setSortType("everything")}>
            Everything
          </button>
        </li>
      </ul>

      {sortType === "ingredientsOnly" ? (
        <table>
          <thead>
            <tr>
              <th>Ingredients</th>
            </tr>
          </thead>
          <tbody>
            {groceryList &&
              groceryList.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        ""
      )}

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
                <tr key={item.id}>
                  <td> {item.name}</td>
                  <td>{item.meals.length}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        ""
      )}

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
                <tr key={item.id}>
                  <td> {item.name}</td>
                  <td>{item.meals.length}</td>
                  <td>
                    {/* <ol> */}
                  {item && item.meals.map((meal)=>
                   <p>{meal.name}</p> 
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
                <tr key={item.id}>
                  <td> {item.name}</td>
                  <td>
                    {/* <ol> */}
                  {item && item.meals.map((meal)=>
                   <p>{meal.quantity}, {meal.unit}</p> 
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
   {sortType === "everything" ? (
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
                <tr key={item.id}>
                  <td> {item.name}</td>
                  <td>
                    {/* <ol> */}
                  {item && item.meals.map((meal)=>
                   <p>{meal.name}</p> 
                  )}
                    {/* </ol> */}
                  </td>
                  <td>
                    {/* <ol> */}
                  {item && item.meals.map((meal)=>
                   <p>{meal.quantity} {meal.unit}</p> 
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
};


export default GroceryList;
