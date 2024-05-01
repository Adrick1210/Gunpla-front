import ValidatedForm from "../components/ValidatedForm";
import CardForm from "../components/CardForm";
import { useLocation } from "react-router-dom";
import { Button, Divider } from "@mui/material";

function Total() {
  const location = useLocation();
  const subPrice = location.state?.subPrice || 0;
  const taxes = 5.55;
  const shipping = 4.3;
  const cartTotal = subPrice + taxes + shipping;

  return (
    <div>
      <h1>Checkout Page</h1>

      <div className="user-info">
        <ValidatedForm />
      </div>
      <div className="card-info">
        <CardForm />
      </div>
      <Divider sx={{ marginTop: "20px" }} />
      <h2>Today's Total</h2>
      <div className="cart-total">
        <div className="totals">
          <div className="price">
            <h4>Cart Total: </h4>
            <p>${subPrice.toFixed(2)}</p>
          </div>
          <div className="price">
            <h4>Taxes:</h4>
            <p>${taxes.toFixed(2)}</p>
          </div>
          <div className="price">
            <h4>Shipping:</h4>
            <p>${shipping.toFixed(2)}</p>
          </div>

          <Divider />
          <h2>Your Total: ${cartTotal.toFixed(2)}</h2>
        </div>
        <Button variant="contained" color="success">
          Checkout
        </Button>
      </div>
    </div>
  );
}
export default Total;
