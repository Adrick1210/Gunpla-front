import ValidatedForm from "../components/ValidatedForm";
import CardForm from "../components/CardForm";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";

function Total() {
  const location = useLocation();
  const cartTotal = location.state?.cartTotal || 0;
  
  return (
    <div>
      <h1>Checkout Page</h1>
      
      <div className="user-info">
        <ValidatedForm />
      </div>
      <div className="card-info">
        <CardForm />
      </div>
      <h2>Your total: ${cartTotal.toFixed(2)}</h2>
        <Button variant="contained"
            color="success">Checkout</Button>
    </div>
  );
}
export default Total;
