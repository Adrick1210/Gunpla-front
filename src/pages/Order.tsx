import { useLocation } from "react-router";

function Order() {
    const location = useLocation();
    const confirmationNumber = location.state?.confirmationNumber || "";
    
    return (
      <div>
        <h1>Order Confirmation</h1>
        <p>Your order has been confirmed!</p>
        <p>Confirmation Number: {confirmationNumber}</p>
        <p>Thank you for shopping with us!</p>
      </div>
    );
  }
  
  export default Order;