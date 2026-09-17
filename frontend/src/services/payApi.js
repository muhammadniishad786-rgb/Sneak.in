import api from "./api";

// Create Razorpay Order
export const createPaymentOrder = async (amount) => {
  const response = await api.post("/payment/create-order", {
    amount,
  });

  return response.data;
};

// Verify Razorpay Payment
export const verifyPayment = async (paymentData) => {
  const response = await api.post(
    "/payment/verify",
    paymentData
  );

  return response.data;
};
