import React from "react";
import { useDessertContext } from "../../contexts/DessertsContext";
import Dessert from "../Dessert/Dessert";

const DessertList = () => {
  const { desserts } = useDessertContext();
  console.log(desserts);

  return <Dessert desserts={desserts} />;
};

export default DessertList;
