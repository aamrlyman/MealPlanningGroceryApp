import React, { useState, useEffect, Fragment } from "react";
import useAuth from "../../hooks/useAuth";
import DisplayScheduledMeals from "../../components/DisplayScheduledMeals/DisplayScheduledMeals";
import axios from "axios";

const MealSchedulePage = (props) => {
  const [scheduledMeals, setScheduledMeals] = useState();
  const [user, token] = useAuth();
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    const getUserSchedule = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/schedules/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        setSchedule(response.data[0]);
        getScheduledMeals(response.data[0]);
        if (response.data.length < 1) {
             createUserSchedule();
             getUserSchedule();
          };
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserSchedule()
  }, []);

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
        // `http://127.0.0.1:8000/api/schedules/1/`,
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
        {schedule ? (
            <h1>Schedule_id: {schedule.id}</h1>
          ) : (
            <h1>No Schedule created yet</h1>
          )}
    <table>
      <thead>
        <tr>
          <th>Cooked .</th>
          <th>Meal .</th>
          <th>Recipe URL .</th>
          <th>Time .</th>
        </tr>
      </thead>
      <tbody>
          {scheduledMeals &&
            scheduledMeals.map((meal) => (
                <Fragment key={meal.id}>
                    <DisplayScheduledMeals meal={meal} />
                </Fragment>
            ))}
      </tbody>
    </table>
    <button>Clear Schedule</button>
    </div>
  );
};

export default MealSchedulePage;
