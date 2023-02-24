import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteUserMeal = ({ meal, fetchMeals }) => {
  const [user, token] = useAuth();
  //   const { mealId } = useParams();
  const navigate = useNavigate();

  const deleteMeal = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this meal? This action cannot be undone."
      )
    ) {
      return null;
    }
    try {
      let response = await axios.delete(
        `http://127.0.0.1:8000/api/meals/${meal.id}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (window.location.href === "http://localhost:3000/userMealsList/") {
        fetchMeals();
      } else navigate("/userMealsList/");
      console.log(response);
    } catch (error) {
      console.log(error.message);
      if (error.message === "Request failed with status code 409")
        alert("You can't delete a meal that is being used on a schedule");
    }
  };

  return (
    <div>
      <button className="noBorder" type="button" onClick={() => deleteMeal()}>
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
};

export default DeleteUserMeal;
