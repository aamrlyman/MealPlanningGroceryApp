import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const ScheduleIdContext = createContext();

export default ScheduleIdContext;

export const ScheduleIdProvider = ({ children }) => {
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
        //   getScheduledMeals(response.data[0]);
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

  return (
    <ScheduleIdContext.Provider value={{ schedule, setSchedule }}>
      {children}
    </ScheduleIdContext.Provider>
  );
};
