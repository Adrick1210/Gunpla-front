import { useContext, useEffect } from "react";
import { ProductContext } from "../contexts/ProductContext";
import DeleteIcon from '@mui/icons-material/Delete';

function Cart() {
  const { populateCart, populatedCart } = useContext(ProductContext);

  useEffect(() => {
    try {
      populateCart();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);
  // console.log(populatedCart);
  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {populatedCart.map((items) => {
        return (
          <div className="cart-card" key={items._id}>
            <img src={items.boxArt} alt="cart box art" />
            <p>{items.name}</p>
            <p>${items.price.$numberDecimal}</p> 
            <p>Quantity: {items.quantity}</p> 
            <DeleteIcon />
          </div>
        )
      })}
    </div>
  )
}
export default Cart;
