import { useLocation } from "react-router";

function Order() {
    const location = useLocation();
    const confirmationNumber = location.state?.confirmationNumber || "";
    
    return (
      <div className="confirmation">
        <h1>Order Confirmation</h1>
        <p>Your order has been confirmed!</p>
        <p>Confirmation Number: {confirmationNumber}</p>
        <img src="https://i.ytimg.com/vi/P1G2nNZ7sOQ/maxresdefault.jpg" alt="orderImage" />
        <h2>Thank you for shopping with us!</h2>
      </div>
    );
  }
  
  export default Order;