import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import axios from "axios";

const CibusPlanning = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    const getUserSchedule = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/schedules/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setSchedule(response.data[0]);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getUserSchedule();
  }, [token]);
  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
        {schedule ? <h1>Schedule_id: {schedule.id}</h1> : <h1>No Schedule created yet</h1> }
      <Outlet scheduleId={schedule.id} />

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