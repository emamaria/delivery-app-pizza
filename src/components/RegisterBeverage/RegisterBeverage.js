import React from "react";
import { useForm } from "react-hook-form";
import { API } from "../../shared/services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const RegisterBeverage = () => {
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  let userToken = localStorage.getItem("token");

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("img", data.img[0]);
    formData.append("price", Number(data.price));
    formData.append("name", data.name);
    console.log(formData);
    API.post(`/products/beverages/`, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((response) => {
      if (response.status === 201) {
        Swal.fire(
          "Correcto",
          "El producto se creó correctamente en la base de datos.",
          "success"
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un problema a la hora de crear el producto.",
        });
      }
      navigate("/beverages");
    });
  };

  return (
    <section className="container-fluid">
      <section className="row justify-content-center">
        <section className="col-12 col-sm-6 col-md-3">
          <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <div className="p-5">
              <h1 className="text-center">Crea un producto</h1>
            </div>

            <div className="form-group">
              <label htmlFor="bebida">Nombre de la nueva bebida:</label>
              <input
                className="ml-2"
                type="text"
                name="name"
                id="bebida"
                {...register("name", { required: true })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="precio">Precio:</label>
              <input
                className="ml-5"
                type="number"
                name="price"
                id="precio"
                {...register("price", { required: true })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="img">Imagen:</label>
              <input
                className="ml-2"
                type="file"
                name="img"
                id="img"
                {...register("img", { required: true })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción:</label>
              <input
                className="ml-2"
                type="text"
                name="description"
                id="descripcion"
                {...register("description", { required: false })}
              />
            </div>
            <button className="btn btn-primary btn-block">
              Crear producto
            </button>
          </form>
        </section>
      </section>
    </section>
  );
};
