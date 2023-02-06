import React, { useState, useEffect, Fragment } from "react";
import useAuth from "../../hooks/useAuth";
import DisplayScheduledMeals from "../../components/DisplayScheduledMeals/DisplayScheduledMeals";
import axios from "axios";

const MealSchedulePage = (props) => {
  const [scheduledMeals, setScheduledMeals] = useState();
  const [user, token] = useAuth();
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    // if (!schedule || schedule.length === 0) {
    //     createUserSchedule();
         getUserSchedule();
    //   }
    // ;
  }, [token]);

  const getUserSchedule = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/schedules/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setSchedule(response.data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

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
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    const getScheduledMeals = async () => {
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
    getScheduledMeals();
  }, []);

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
    </div>
  );
};

export default MealSchedulePage;
