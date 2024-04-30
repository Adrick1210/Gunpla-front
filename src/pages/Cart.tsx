import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../contexts/ProductContext";
import { Divider } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

function Cart() {
  const { cart, removeFromCart, editCartItem } = useContext(ProductContext);
  const [subPrice, setSubPrice] = useState<number>(0);
  const navigate = useNavigate();
  const taxes = 5.55;
  const shipping = 4.3;

  useEffect(() => {
    const total = Object.values(cart).reduce((acc, item) => {
      if (item.product && item.product.price) {
        return acc + item.product?.price?.$numberDecimal * item?.quantity || 0;
      } else {
        return acc;
      }
    }, 0);
    setSubPrice(total);
  }, [cart]);

  const cartTotal = subPrice + taxes + shipping;

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleEdit = (item: Product, newQuantity: number) => {
    editCartItem(item._id, newQuantity);
  };

  const handleCheckClick = () => {
    navigate("/checkout", {state: {cartTotal} });
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {Object.keys(cart).length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        Object.keys(cart).map((productId) => {
          const item = cart[productId].product;
          const quantity = cart[productId].quantity;
          console.log(item);
          if (item) {
            const productPageUrl = `/products/${item._id}`;
            return (
              <div className="cart-card" key={item._id}>
                <Link to={productPageUrl}>
                  <img src={item.boxArt} alt="cart box art" />
                </Link>
                <p>{item.name}</p>
                <p>${item.price.$numberDecimal}</p>

                <FormControl
                  sx={{
                    minWidth: "80px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Quantity
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={quantity}
                    label="quantity"
                    onChange={(e) => handleEdit(item, Number(e.target.value))}
                  >
                    {Array.from({ length: 10 }, (_, index) => index + 1).map(
                      (num) => (
                        <MenuItem value={num} key={num}>
                          {num}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>

                <DeleteIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleRemoveFromCart(item._id)}
                />
              </div>
            );
          }
          return null;
        })
      )}
      {Object.keys(cart).length > 0 && (
        <div className="subtotal-container">
          <Divider />
          <div className="subtotal">
            <h4>Cart Total:</h4>
            <p>Cart Subtotal: ${subPrice.toFixed(2)}</p>
            <p>Taxes: ${taxes.toFixed(2)}</p>
            <p>Shipping: ${shipping.toFixed(2)}</p>
            <Divider />
            <h4>Total: ${cartTotal.toFixed(2)}</h4>
          </div>
          <Button
            variant="contained"
            color="success"
            onClick={handleCheckClick}
            sx={{ height: "40px" }}
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
