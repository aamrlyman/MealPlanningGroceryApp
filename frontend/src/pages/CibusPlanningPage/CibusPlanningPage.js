import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import axios from "axios";


const CibusPlanning = ( props ) => {
  const [user, token] = useAuth();
  const [testContext, setTestContext] = useState("IT WORKED");

  return (
    <div className="container">
      <h1>Welcome {user.username}!</h1>
      <Outlet context={[testContext, setTestContext]}/>
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
