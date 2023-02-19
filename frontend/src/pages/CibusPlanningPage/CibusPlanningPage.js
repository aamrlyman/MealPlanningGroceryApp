import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import axios from "axios";

const CibusPlanning = (props) => {
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
      console.log(response.data);
      setScheduledMeals(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // function removeMealFromScheduleMealView(mealId) {
  //   let id = scheduledMeals
  //     .filter((sMeal) => sMeal.meal.id === mealId)[0]
  //     .id.then(removeMealFromSchedule(id, schedule.id, getScheduledMeals));
  // }

  const removeMealFromSchedule = async (
    scheduledMealId,
    scheduleId,
    afterDelete
  ) => {
    try {
      let response = await axios.delete(
        `http://127.0.0.1:8000/api/schedules/scheduled_meal/${scheduledMealId}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      afterDelete(scheduleId);
      // getScheduledMeals(scheduleId);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const clearSchedule = async (schedule) => {
    try {
      let response = await axios.delete(
        `http://127.0.0.1:8000/api/schedules/${schedule.id}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // getScheduledMeals(schedule);
      setScheduledMeals(null)
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Welcome {user.username}!</h1>
      <Outlet
        context={[
          schedule,
          scheduledMeals,
          getScheduledMeals,
          removeMealFromSchedule,
          clearSchedule
        ]}
      />
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
