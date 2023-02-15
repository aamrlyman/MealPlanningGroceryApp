// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Pages Imports
import CibusPlanningPage from "./pages/CibusPlanningPage/CibusPlanningPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MealSchedulePage from "./pages/MealSchedulePage/MealSchedulePage";
import AllMealsList from "./pages/AllMealsList/AllMealsList";
import DisplayMeal from "./pages/DisplayMeal/DisplayMeal";
import CreateMeal from "./pages/CreateMeal/CreateMeal";
import UserMealsList from "./pages/UserMealsList/UserMealsList";
import UserMeal from "./pages/UserMeal/UserMeal";
import GroceryList from "./pages/GroceryList/GroceryList";
import NotFound from "./pages/NotFound/NotFound";
import LandingPage from "./pages/LandingPage/LandingPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import useAuth from "./hooks/useAuth";
import ScheduleIdProvider from "./context/scheduleIdContext";

function App() {
  const [schedule, setSchedule] = useState();
  const [scheduledMeals, setScheduledMeals] = useState();
  const [user, token] = useAuth();

  useEffect(() => {
    const getUserSchedule = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/schedules/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setSchedule(response.data[0]);
        getScheduledMeals(response.data[0]);
        if (response.data.length < 1) {
          createUserSchedule();
          getUserSchedule();
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserSchedule();
  }, [token]);

  const createUserSchedule = async () => {
    try {
      let response = await axios.post(
        "http://127.0.0.1:8000/api/schedules/",
        { user_id: user.id },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getScheduledMeals = async (schedule) => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/schedules/${schedule.id}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setScheduledMeals(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <CibusPlanningPage />
            </PrivateRoute>
          }
        >
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MealSchedulePage
                  schedule={schedule}
                  scheduledMeals={scheduledMeals}
                  getScheduledMeals={getScheduledMeals}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/mealsList"
            element={
              <PrivateRoute>
                <AllMealsList
                  schedule={schedule}
                  scheduledMeals={scheduledMeals}
                  getScheduledMeals={getScheduledMeals}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/meal/:mealId"
            element={
              <PrivateRoute>
                <DisplayMeal
                  schedule={schedule}
                  scheduledMeals={scheduledMeals}
                  getScheduledMeals={getScheduledMeals}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/createMeal"
            element={
              <PrivateRoute>
                <CreateMeal />
              </PrivateRoute>
            }
          />
          <Route
            path="userMealsList/"
            element={
              <PrivateRoute>
                <UserMealsList
                  schedule={schedule}
                  scheduledMeals={scheduledMeals}
                  getScheduledMeals={getScheduledMeals}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/userMeal/:mealId"
            element={
              <PrivateRoute>
                <UserMeal
                  schedule={schedule}
                  scheduledMeals={scheduledMeals}
                  getScheduledMeals={getScheduledMeals}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/groceries"
            element={
              <PrivateRoute>
                <GroceryList schedule={schedule} />
              </PrivateRoute>
            }
          />
        </Route>
        {/* <Route path="landingPage" element={<LandingPage />} /> */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

// managing state https://www.youtube.com/watch?v=FzlurzsCW4M
