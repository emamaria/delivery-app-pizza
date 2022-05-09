import React, { useEffect, useState } from "react";
import { usePizzaContext } from "../../contexts/PizzaContext";
import Swal from "sweetalert2";

const CreateYourOwnPizza = () => {
  const { pizzas, ingredientes, setIngredientes } = usePizzaContext();

  let arrayFusion = [];

  pizzas.forEach((p) => {
    for (let ingredientesDelArrayPrincipal of p.ingredients) {
      if (!arrayFusion.includes(ingredientesDelArrayPrincipal)) {
        arrayFusion.push(ingredientesDelArrayPrincipal);
      }
    }
    return arrayFusion.sort();
  });

  return (
    <div>
      <select
        onChange={(e) => {
          setIngredientes({
            ...ingredientes,
            ingrediente1:
              !Object.values(ingredientes).includes(e.target.value) &&
              e.target.value,
          });
        }}
      >
        <option>Seleccione el ingrediente numero 1</option>;
        {arrayFusion.map((i) => {
          return <option value={i}>{i}</option>;
        })}
      </select>

      <select
        onChange={(e) => {
          setIngredientes({
            ...ingredientes,
            ingrediente2:
              !Object.values(ingredientes).includes(e.target.value) &&
              e.target.value,
          });
        }}
      >
        <option>Seleccione el ingrediente numero 2</option>;
        {arrayFusion.map((i) => {
          return <option value={i}>{i}</option>;
        })}
      </select>

      <select
        onChange={(e) => {
          setIngredientes({
            ...ingredientes,
            ingrediente3:
              !Object.values(ingredientes).includes(e.target.value) &&
              e.target.value,
          });
        }}
      >
        <option>Seleccione el ingrediente numero 3</option>;
        {arrayFusion.map((i) => {
          return <option value={i}>{i}</option>;
        })}
      </select>

      {console.log(ingredientes)}
    </div>
  );
};

export default CreateYourOwnPizza;
