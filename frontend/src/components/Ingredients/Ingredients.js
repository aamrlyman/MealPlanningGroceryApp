import AddIngredient from "../AddIngredient/AddIngredient";
import DisplayIngredients from "../DisplayIngredients/DisplayIngredients";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Ingredients = ({ meal }) => {
  const [ingredients, setIngredients] = useState();
  const { mealId } = useParams();
  const [user, token] = useAuth();

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
  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div>
      {ingredients &&
        ingredients.map((ingredient) => (
          <DisplayIngredients
            meal={meal}
            ingredient={ingredient}
            fetchIngredients={fetchIngredients}
          />
        ))}
      <AddIngredient
        key={meal.id + "add"}
        meal={meal}
        fetchIngredients={fetchIngredients}
      />
    </div>
  );
};

export default Ingredients;
