import { useLocation } from "react-router";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

function Order() {
  const location = useLocation();
  const confirmationNumber = location.state?.confirmationNumber || "";
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="confirmation">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <h1>Order Confirmation</h1>
      <p>Your order has been confirmed!</p>
      <p>Confirmation Number: {confirmationNumber}</p>
      <img
        src="https://i.ytimg.com/vi/P1G2nNZ7sOQ/maxresdefault.jpg"
        alt="orderImage"
      />
      <h2>Thank you for shopping with us!</h2>
    </div>
  );
}

export default Order;
