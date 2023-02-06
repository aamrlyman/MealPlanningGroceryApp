import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import axios from "axios";


const CibusPlanning = ( props ) => {
  const [user, token] = useAuth();


  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      <Outlet />
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
