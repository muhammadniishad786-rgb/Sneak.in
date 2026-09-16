import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchOrderById } from "../redux/features/orderSlice";

function OrderStatus() {
  const dispatch = useDispatch();

  // Get order ID from URL
  const { id } = useParams();

  const { order, loading, error } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  console.log(order);

  if (loading) {
    return <div>Loading order...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Order Details</h1>

      {order && (
        <div>
          <p>Order Number: {order.orderNumber}</p>
          <p>Order Status: {order.orderStatus}</p>
          <p>Payment Method: {order.paymentMethod}</p>
          <p>Payment Status: {order.paymentStatus}</p>
          <p>Total: ₹{order.totalAmount}</p>
        </div>
      )}
    </div>
  );
}

export default OrderStatus;
