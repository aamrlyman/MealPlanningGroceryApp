import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import axios from "axios";

const CibusPlanning = ( props ) => {
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
        getScheduledMeals(response.data[0] && response.data[0].id);
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
  const getScheduledMeals = async (scheduleId) => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/schedules/${scheduleId}/`,
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
    <div className="container">
      <h1>Welcome {user.username}!</h1>
      <Outlet context={[schedule, scheduledMeals, getScheduledMeals]}/>
    </div>
  );
};

export default CibusPlanning;

/* {cars &&
cars.map((car) => (
  <p key={car.id}>
    {car.year} {car.model} {car.make}
  </p>
))} */
