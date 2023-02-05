import React, { useState, useEffect } from 'react';
import useAuth from "../../hooks/useAuth";
import DisplayScheduledMeals from "../../components/DisplayScheduledMeals/DisplayScheduledMeals"
import axios from "axios";

const MealSchedulePage = () => {
    
    const [scheduledMeals, setScheduledMeals] = useState();
    const [user, token] = useAuth();

    useEffect(() => {
      const getScheduledMeals = async () => {
        try {
          let response = await axios.get("http://127.0.0.1:8000/api/schedules/1/", {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          setScheduledMeals(response.data);
        } catch (error) {
          console.log(error.response.data);
        }
      };
      getScheduledMeals();
    }, [token]);



    return (  
       <table>
        <thead>
            <tr>
                <th>Cooked  .</th>
                <th>Meal  .</th>
                <th>Recipe  .</th>
                <th>Time  .</th>
            </tr>
        </thead>
        <tbody>
            <DisplayScheduledMeals scheduledMeals={scheduledMeals}/> 

        </tbody>
       </table>
    );
}
 
export default MealSchedulePage;