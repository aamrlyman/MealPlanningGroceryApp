import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const GroceryList = ({ schedule, getScheduledMeals, scheduledMeals }) => {
  const [user, token] = useAuth();
  const { mealId } = useParams();
  const [groceryList, setGroceryList] = useState();
  const [sortType, setSortType] = useState("ingredientsOnly");


  function copiedGroceries(array, sortType){
    let copiedList = "";
    switch(sortType){
      case "ingredientsOnly":
      copiedList = "Ingredients Needed: ";
      for(const index in array){
        copiedList += `\n -${array[index].name}`
      };
      return copiedList
  
      case "+MealCount":
      copiedList = "Ingredients, # of Meals";
      for(const index in array){
        copiedList += `\n  ${array[index].name}, ${array[index].meals.length}`
      };
      return copiedList

      case "+MealNames":
      copiedList = "Ingredients, (Meals)"
      let meals = ""
      for(const index in array){
        copiedList += `\n - ${array[index].name} (` 
        for(const i in array[index].meals){
          if(i ==! (array[index].meals.length - 1)){
            meals+= ` ${array[index].meals[i].name},`
          }
          else(
            meals+= ` ${array[index].meals[i].name}`
          )
        }
        copiedList += `${meals})`;
        meals="";
      }
      return copiedList
    
      case "+quantities":
      copiedList = "Ingredients, (Quantities)"
      let quantities = ""
      for(const index in array){
        copiedList += `\n - ${array[index].name} (` 
        for(const i in array[index].meals){
          if(i ==! (array[index].meals.length - 1)){
            quantities+= ` ${array[index].meals[i].quantity} ${array[index].meals[i].unit},`
          }
          else(
            quantities+= ` ${array[index].meals[i].quantity} ${array[index].meals[i].unit}`
          )
        }
        copiedList += `${quantities})`;
        quantities="";
      }
      return copiedList

      case "everything":
      copiedList = "Ingredients |  Meals  |  Quantities"
      let everything = ""
      for(const index in array){
        copiedList += `\n - ${array[index].name} (` 
        for(const i in array[index].meals){
          if(i ==! (array[index].meals.length - 1)){
            everything+= ` ${array[index].meals[i].name}: ${array[index].meals[i].quantity} ${array[index].meals[i].unit},`
          }
          else(
            everything+= ` ${array[index].meals[i].name}: ${array[index].meals[i].quantity} ${array[index].meals[i].unit}`
          )
        }
        copiedList += `${everything})`;
        everything="";
      }
      return copiedList
    }
  }

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
            +MealNames
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
                <tr key={item.id + "MC"}>
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
                <tr key={item.id + "MN"}>
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
                <tr key={item.id + "q"}>
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
                <tr key={item.id + "e"}>
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
     <button
        onClick={() => {
          navigator.clipboard.writeText(
            copiedGroceries(groceryList, sortType)
          );
        }}
      >
        Copy List
      </button>
<textarea></textarea>
    </div>
  );
};


export default GroceryList;
