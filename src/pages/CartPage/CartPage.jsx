import React from "react";
import CheckOut from "../../shared/components/CheckOut/CheckOut";
import { useCartContext } from "../../shared/contexts/CartContext";
import Swal from "sweetalert2";
import "./_CartPage.scss";

const CartPage = () => {
  const { cartItems, deleteItems, restarItems, sumarItems } = useCartContext();

  //ElEMENTOS QUE PASAMOS A CHECKOUT
  let totalAPagar = cartItems.reduce((a, c) => a + c.subtotal, 0);
  let products = cartItems.map((product) => {
    return { name: product.name, amount: product.cant, price: product.price };
  });

  console.log(products);
  const confirmarProductoAEliminar = (producto) => {
    Swal.fire({
      title: "¿Estas seguro de eliminar este producto?",
      text: "Recuerda que si lo eliminas, no podrás recuperarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //Eliminar
        deleteItems(producto);
      }
    });
  };

  return (
    <div className="cart container">
      {cartItems.length === 0 && (
        <h1>Aun no tienes productos en el carrito de compras</h1>
      )}

      {cartItems.map((productosDelCarrito) => {
        return (
          <div className="cart_items">
            <div className="cart_items-image">
              <h1>{productosDelCarrito.name.substr(0, 30)}</h1>
              <img src={productosDelCarrito.img} alt="" />
              <div className="cart_items-buttons">
                <button className="minus"
                  onClick={() =>
                    productosDelCarrito.cant > 1
                      ? restarItems(productosDelCarrito)
                      : confirmarProductoAEliminar(productosDelCarrito)
                  }
                >
                  -
                </button>
                <h2>{productosDelCarrito.cant}</h2>
                <button onClick={() => sumarItems(productosDelCarrito)}>
                  +
                </button>
              </div>
            </div>
            <div className="cart_items-info">
              <p>Precio: {productosDelCarrito.price}</p>
              <p>Subtotal: {parseInt(productosDelCarrito.subtotal)} €</p>
            </div>
            <button
              className="cart_items-delete"
              onClick={() => confirmarProductoAEliminar(productosDelCarrito)}
            >
              Eliminar producto
            </button>
          </div>
        );
      })}

      {cartItems.length !== 0 && (
        <CheckOut subtotal={totalAPagar} cartProducts={products} />
      )}
    </div>
  );
};

export default CartPage;
