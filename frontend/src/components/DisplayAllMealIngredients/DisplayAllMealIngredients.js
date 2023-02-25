import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./DisplayAllMealIngredients.css";

const DisplayAllMealIngredients = (props) => {
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
    <ul className="allMealIngredients">
      {ingredients &&
        ingredients.map((ingredient) => (
          <Fragment key={ingredient.id + "amic"}>
                <li key={ingredient.id}>
                  <span className="quantities">
                  {ingredient.quantity} {ingredient.unit}{" "}
                  </span>
                  {ingredient.name}
                </li>
          </Fragment>
        ))}
    </ul>
  );
};

export default DisplayAllMealIngredients;
