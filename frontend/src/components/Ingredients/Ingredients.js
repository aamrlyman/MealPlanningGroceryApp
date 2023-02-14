import AddIngredient from "../AddIngredient/AddIngredient";
import DisplayIngredients from "../DisplayIngredients/DisplayIngredients";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Fragment } from "react";
import EditIngredients from "../../components/EditIngredients/EditIngredients";

const Ingredients = ({ meal }) => {
  const [ingredients, setIngredients] = useState();
  const { mealId } = useParams();
  const [user, token] = useAuth();
  const [editIngredientId, setEditIngredientId] = useState(null);
  const [editIngredient, setEditIngredient] = useState({
    name: "",
    unit: "",
    quantity: 0,
    meal_id: mealId,
  });

  async function fetchIngredients() {
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
    }
  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleEditClick = (ingredient) => {
    setEditIngredientId(ingredient.id);
    // console.log(ingredient);
    // const ingredientValues = {
    //     name: ingredient.name,
    //     unit: ingredient.unit,
    //     quantity: ingredient.quantity,
    //     meal_id: mealId,

    // };
    // setEditIngredient(ingredientValues);
  };

  const handleCancelClick = () => {
    setEditIngredientId(null);
  };

  return (
    <div>
      {ingredients &&
        ingredients.map((ingredient) => (
          editIngredientId === ingredient.id? (
            <EditIngredients 
            ingredient={ingredient}
            editIngredient={editIngredient}
            setEditIngredient={setEditIngredient}
            setEditIngredientId={setEditIngredientId}
            key={ingredient.id + "Eingre"}
            handleCancelClick={handleCancelClick}
            fetchIngredients={fetchIngredients}
            />
              ):
              (
                  <DisplayIngredients
                    meal={meal}
                    ingredient={ingredient}
                    fetchIngredients={fetchIngredients}
                    handleEditClick={handleEditClick}
                    key={ingredient.id + "Dingre"}
                  />
                  
          )

        ))}
      <AddIngredient
        key={meal.id + "add"}
        meal={meal}
        fetchIngredients={fetchIngredients}
        // style={{visibility: "hidden"}} not sure how to do this yet
      />
    </div>
  );
};

export default Ingredients;
