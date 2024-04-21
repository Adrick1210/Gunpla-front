import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../contexts/ProductContext";
import { Divider } from "@mui/material";

function Cart() {
  const { populateCart, populatedCart, removeFromCart, editCartItem } =
    useContext(ProductContext);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

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

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price.$numberDecimal * item?.quantity || 0,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCart(itemId);
    setCartItems((cartItems) =>
      cartItems.filter((item) => item._id !== itemId)
    );
  };

  const handleEdit = (item: Product, newQuantity: number) => {
    editCartItem(item._id, newQuantity);
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        cartItems.map((item) => {
          const productPageUrl = `/products/${item._id}`;
          return (
            <div className="cart-card" key={item._id}>
              <Link to={productPageUrl}>
                <img src={item.boxArt} alt="cart box art" />
              </Link>
              <p>{item.name}</p>
              <p>${item.price.$numberDecimal}</p>
              <p>
                Quantity:{" "}
                <select
                  value={item.quantity}
                  onChange={(e) => handleEdit(item, parseInt(e.target.value))}
                >
                  {Array.from({ length: 10 }, (_, index) => index + 1).map(
                    (num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    )
                  )}
                </select>
              </p>
              <DeleteIcon
                sx={{ cursor: "pointer" }}
                onClick={() => handleRemoveFromCart(item._id)}
              />
            </div>
          );
        })
      )}
      {cartItems.length > 0 && <Divider />}
      {cartItems.length > 0 && <p>Total Price: ${totalPrice.toFixed(2)}</p>}
    </div>
  );
}

export default Cart;
