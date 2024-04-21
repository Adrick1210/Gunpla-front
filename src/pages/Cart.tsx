import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../contexts/ProductContext";
import { Divider } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Cart() {
  const { cart, removeFromCart, editCartItem } = useContext(ProductContext);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const total = Object.values(cart).reduce((acc, item) => {
      if (item.product && item.product.price) {
        return acc + item.product?.price?.$numberDecimal * item?.quantity || 0;
      } else {
        return acc;
      }
    }, 0);
    setTotalPrice(total);
  }, [cart]);

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleEdit = (item: Product, newQuantity: number) => {
    editCartItem(item._id, newQuantity);
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
      {Object.keys(cart).length > 0 && <Divider />}
      {Object.keys(cart).length > 0 && (
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
      )}
    </div>
  );
}

export default Cart;
