import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./_UserProfile.scss";
import { useForm } from "react-hook-form";
import { API } from "../../shared/services/api";

export const UserProfile = () => {
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  let userToken = localStorage.getItem("token");
  let user = JSON.parse(localStorage.getItem("user"));

  const onSubmitImg = (data) => {
    const formData = new FormData();
    formData.append("img", data.img[0]);
    console.log(formData);

    console.log(user);
    console.log(user._id);

    API.patch(`/users/${user._id}/`, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((response) => {
      API.get(`/users/${user._id}/`).then((respuesta) => {
        console.log(respuesta);
        localStorage.setItem("user", JSON.stringify(respuesta.data));
      });

      if (response.status === 200) {
        Swal.fire(
          "Correcto",
          "La imagen se actualizó correctamente.",
          "success"
        ).then(() => window.location.reload(true));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un problema al subir el archivo.",
        });
      }
      navigate("/profile");
    });
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    if (data.name !== "") {
      formData.append("name", data.name);
    }
    if (data.email !== "") {
      formData.append("email", data.email);
    }
    console.log(formData);

    console.log(user);
    console.log(user._id);

    API.patch(`/users/${user._id}/`, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((response) => {
      API.get(`/users/${user._id}/`).then((respuesta) => {
        console.log(respuesta);
        localStorage.setItem("user", JSON.stringify(respuesta.data));
      });

      if (response.status === 200) {
        Swal.fire(
          "Correcto",
          "El cambio se realizo correctamente en la base de datos.",
          "success"
        ).then((result) => console.log("entra"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un problema a la hora de la subida de archivo.",
        });
      }
    });
  };

  return (
    <div className="containerProfile">
      <h1>PERFIL:</h1>

      <div className="dataProfile">
        <div className="data">
          <h2>Nombre: </h2>
          <p>{user.name}</p>
          <h2>Email: </h2>
          <p>{user.email}</p>
        </div>
        <div className="imageProfile">
          <img src={user.img} alt="" />
         
        </div>
      </div>
      <div className="formProfile">
        <form onSubmit={handleSubmit(onSubmitImg)} className="form">
          <h2>Subir nueva imagen:</h2>
          <input
            type="file"
            name="img"
            className="formInput"
            {...register("img", { required: false })}
          />
          <button className="buttonProfile">Subir imagen</button>
        </form>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h2>Cambiar nombre:</h2>
          <input
            type="text"
            name="name"
            className="formInput"
            {...register("name", { required: false })}
          />
          <h2>Cambiar email:</h2>
          <input
            type="email"
            name="email"
            className="formInput"
            {...register("email", { required: false })}
          />

          <button className="buttonProfile">Subir</button>
        </form>
      </div>
    </div>
  );
};
