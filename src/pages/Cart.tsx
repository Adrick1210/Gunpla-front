import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../contexts/ProductContext";

function Cart() {
  const { populateCart, populatedCart, removeFromCart } =
    useContext(ProductContext);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      populateCart();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    setCartItems(populatedCart);
  }, [populatedCart]);

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCart(itemId);
    setCartItems((cartItems) =>
      cartItems.filter((item) => item._id !== itemId)
    );
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {cartItems.map((item) => {
        const productPageUrl = `/products/${item._id}`;
        return (
          <div className="cart-card" key={item._id}>
            <Link to={productPageUrl}>
              <img src={item.boxArt} alt="cart box art" />
            </Link>
            <p>{item.name}</p>
            <p>${item.price.$numberDecimal}</p>
            <p>Quantity: {item.quantity}</p>
            <DeleteIcon
              sx={{ cursor: "pointer" }}
              onClick={() => handleRemoveFromCart(item._id)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Cart;
