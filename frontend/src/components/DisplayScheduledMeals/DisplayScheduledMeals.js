import React, { useState } from 'react';
import axios from "axios"
import { useEffect } from 'react';


const ScheduledMeals = (props) => {

    return ( 
        <tr>
        <td>Box</td>
        <td>Chicken Enchiladas</td>
        <td>Recipe URL</td>
        <td>
            <p>Prep time:1 hour</p>
            <p>Cook time:45 minutes</p>
            <p>X</p>
        </td>
    </tr>
     );
}
 
export default ScheduledMeals;