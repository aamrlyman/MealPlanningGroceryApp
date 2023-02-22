import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import cibuslogo2 from "../../cibuslogo2.png";
// import CibusLogo2 from "../../../public/CibusLogo2.png";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [location, setLocation] = useState("home");

  let styleArray = [
    { textDecoration: "none", color: "#2c2219", "font-style":"normal" },
    { textDecoration: "none", color: "#7c262b", "font-weight": "bold", "font-style":"normal" },
  ];

  function changeLocation (user, string){
    if (user){setLocation(string)}
  }
  useEffect (()=>{
   if(user){
    setLocation("home")
   }
   else (setLocation(null))
  },[user]
  )

  return (
    <div className="navBar">
      <ul className="navLi">
        <li className="brand">
          <Link
            to="/"
            style={styleArray[0]}
            onClick={() => changeLocation(user,"home")}
          >
            <img src={cibuslogo2} width="400" height="100" />
          </Link>
          {location === "home" && user? <hr/> : ""}
        </li>
        <li>
          {location !== "/mealsList" ? (
            <Link
              to="/mealsList"
              style={styleArray[0]}
              onClick={() => changeLocation(user, "/mealsList")}
            >
              All Meals
            </Link>
          ) : (
            <Link to="/mealsList" style={styleArray[1]}>
              All Meals
              <hr/>
            </Link>
          )}
        </li>
        <li>
          {location !== "userMealsList/" ? (
            <Link
            to="userMealsList/"
            style={styleArray[0]}
            onClick={() => changeLocation(user, "userMealsList/")}
            >
              My Meals
            </Link>
          ) : (
            <Link to="userMealsList/" style={styleArray[1]}>
              My Meals
            </Link>
          )}
          <span className="plusIcon">
          {location !== "/createMeal" ? (
            <Link
            to="/createMeal"
            style={styleArray[0]}
            onClick={() => changeLocation(user,"/createMeal")}
            >
            <i className="fa-solid fa-plus"></i>
          </Link>
        ) : (
          <Link to="/createMeal" style={styleArray[1]}>
            <i class="fa-solid fa-plus-minus"></i>
          </Link>
        )}
          </span>
          {location === "userMealsList/"? <hr style={{width: "8.25vw"}} /> : ""}
        </li>

        <li>
          {location !== "/groceries" ? (
            <Link
              to="/groceries"
              style={styleArray[0]}
              onClick={() => changeLocation(user,"/groceries")}
            >
              Grocery List
            </Link>
          ) : (
            <Link to="/groceries" style={styleArray[1]}>
              Grocery List
              <hr/>
            </Link>
          )}
        </li>

        <li>
          {user ? (
            <Link
              to="/login"
              style={styleArray[0]}
              onClick={logoutUser}
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              style={styleArray[0]}
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
