import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const DisplayIngredients = ({ meal, ingredients }) => {
  const [user, token] = useAuth();
  const { mealId } = useParams();
  
  // const [ingredients, setIngredients] = useState();

  // useEffect(() => {
  //   const fetchIngredients = async () => {
  //     try {
  //       let response = await axios.get(
  //         `http://127.0.0.1:8000/api/ingredients/meal_id/${mealId}/`,
  //         {
  //           headers: {
  //             Authorization: "Bearer " + token,
  //           },
  //         }
  //       );
  //       setIngredients(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchIngredients();
  // }, []);

  return (
    <div>
      {ingredients &&
        ingredients.map((ingredient) => (
          <table>
            <tbody>
              <tr key={ingredient.id}>
                <td>{ingredient.name}</td>
                <td>
                  : {ingredient.quantity}, {ingredient.unit}
                </td>
                <td><button>Edit</button></td>
                <td><button>Delete</button></td>
              </tr>
            </tbody>
          </table>
        ))}
    </div>
  );
};

export default DisplayIngredients;
