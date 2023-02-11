import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const DisplayIngredients = ({ meal }) => {
  const [user, token] = useAuth();
  const { mealId } = useParams();
  const [ingredients, setIngredients] = useState();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/ingredients/meal_id/${mealId}/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setIngredients(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchIngredients();
  }, []);

  return (
    <div>
      {ingredients &&
        ingredients.map((ingredient) => (
          <table>
            <tbody>
              <tr>
                <td>{ingredient.name}</td>
                <td>
                  : {ingredient.quantity}, {ingredient.unit}
                </td>
              </tr>
            </tbody>
          </table>
        ))}
    </div>
  );
};

export default DisplayIngredients;
