import React, { useState, useEffect } from "react";
import ClientOrder from "../../shared/components/ClientOrder/ClientOrder";
import "./_ClientOrdersPage.scss";

import axios from "axios";

const ClientsOrdersPage = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  const { name, _id } = user;

  console.log(name, _id);
  let userToken = localStorage.getItem("token");

  const [usersOrders, setUsersOrders] = useState([]);

  console.log("userOrder", usersOrders);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/order`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        let orders = response.data.filter((data) => data.userId === _id);

        console.log(orders);

        setUsersOrders(orders.reverse());
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userToken, _id]);

  return (
    <div className="orderContainer">
      <div className="order-box">
        <h1>Orders of {name.toUpperCase()}</h1>
      </div>

      <table id="customers">
        <tr>
          <th className="client-order">
            <h2>Ordered Products</h2>
          </th>
          <th className="client-order">
            <h2>{name.toUpperCase()}´s address</h2>
          </th>
          <th className="client-order">
            <h2>Order Date</h2>
          </th>
          <th className="client-order">
            <h2>Transaction Id</h2>
          </th>
          <th className="client-order">
            <h2>Order Id</h2>
          </th>
          <th className="client-order">
            <h2>Order Status</h2>
          </th>
        </tr>

        {usersOrders.map((item, index) => {
          return (
            <ClientOrder
              items={item.orderedProducts}
              status={item.deliverStatus}
              address={item.shippingAddress}
              date={item.createdAt.substring(0, 10)}
              trasactionId={item.transactionId}
              OrderId={item._id}
            />
          );
        })}
      </table>
    </div>
  );
};

export default ClientsOrdersPage;
