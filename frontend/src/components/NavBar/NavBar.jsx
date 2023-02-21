import React from "react";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [location, setLocation] = useState();

  let styleArray = [
    { textDecoration: "none", color: "#2c2219" },
    { textDecoration: "underline", color: "#7c262b", "font-weight": "bold"},
  ];

  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link
            to="/"
            style={styleArray[0]}
            onClick={() => setLocation("home")}
          >
            <b>Cibus Planning</b>
          </Link>
        </li>
        <li>
          {location !== "/mealsList" ? (
            <Link
              to="/mealsList"
              style={styleArray[0]}
              onClick={() => setLocation("/mealsList")}
            >
              All Meals
            </Link>
          ) : (
            <Link to="/mealsList" style={styleArray[1]}>
              All Meals
            </Link>
          )}
        </li>

        <li>
          {location !== "userMealsList/" ? (
            <Link
              to="userMealsList/"
              style={styleArray[0]}
              onClick={() => setLocation("userMealsList/")}
            >
              My Meals
            </Link>
          ) : (
            <Link to="userMealsList/" style={styleArray[1]}>
              My Meals
            </Link>
          )}
        </li>

        <li>
          {location !== "/createMeal" ? (
            <Link
              to="/createMeal"
              style={styleArray[0]}
              onClick={() => setLocation("/createMeal")}
            >
              <i className="fa-solid fa-plus"></i>
            </Link>
          ) : (
            <Link to="/createMeal" style={styleArray[1]}>
              <i className="fa-solid fa-plus"></i>
            </Link>
          )}
        </li>
        <li>
          {location !== "/groceries" ? (
            <Link
              to="/groceries"
              style={styleArray[0]}
              onClick={() => setLocation("/groceries")}
            >
              Grocery List
            </Link>
          ) : (
            <Link to="/groceries" style={styleArray[1]}>
              Grocery List
            </Link>
          )}
        </li>

        <li>
          {user ? (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#2c2219" }}
              onClick={logoutUser}
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#2c2219" }}
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
