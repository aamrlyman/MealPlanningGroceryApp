// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import CibusPlanningPage from "./pages/CibusPlanningPage/CibusPlanningPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MealSchedulePage from "./pages/MealSchedulePage/MealSchedulePage";
import AllMealsList from "./pages/AllMealsList/AllMealsList";
import DisplayMeal from "./pages/DisplayMeal/DisplayMeal";
import CreateMeal from "./pages/CreateMeal/CreateMeal";
import UserMealsList from "./pages/UserMealsList/UserMealsList";
import DisplayUserMeal from "./pages/DisplayUserMeal/DisplayUserMeal";
import GroceryList from "./pages/GroceryList/GroceryList";
import NotFound from "./pages/NotFound/NotFound";
import LandingPage from "./pages/LandingPage/LandingPage";



// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
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
                <MealSchedulePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/mealsList"
            element={
              <PrivateRoute>
                <AllMealsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/meal"
            element={
              <PrivateRoute>
                <DisplayMeal />
              </PrivateRoute>
            }
          />
          <Route
            path="/CreateMeal"
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
                <UserMealsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/userMeal"
            element={
              <PrivateRoute>
                <DisplayUserMeal />
              </PrivateRoute>
            }
          />
          <Route
            path="/groceries"
            element={
              <PrivateRoute>
                <GroceryList />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
