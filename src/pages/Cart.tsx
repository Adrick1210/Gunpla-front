import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../contexts/ProductContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Divider, Box } from "@mui/material";

function Cart() {
  const { cart, removeFromCart, editCartItem } = useContext(ProductContext);
  const [subPrice, setSubPrice] = useState<number>(0);
  const navigate = useNavigate();

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

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleEdit = (item: Product, newQuantity: number) => {
    editCartItem(item._id, newQuantity);
  };

  const handleCheckClick = () => {
    navigate("/checkout", { state: { subPrice } });
  };

  return (
    <div className="cart-container">
      {Object.keys(cart).length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        Object.keys(cart).map((productId) => {
          const item = cart[productId].product;
          const quantity = cart[productId].quantity;
          if (item) {
            const productPageUrl = `/products/${item._id}`;
            return (
              <Box  key={item._id} display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" marginTop={4} marginLeft={35} >
                <Box display="flex" width={200} justifyContent="flex-start">
                <Link to={productPageUrl}>
                  <img className="cart-img" src={item.boxArt} alt="cart box art" />
                </Link>
                </Box>
                <Box display="flex" width={200} justifyContent="flex-start">
                  <p>{item.name}</p>
                </Box>
                <Box display="flex" width={200} justifyContent="flex-start">
                  <p>${item.price.$numberDecimal}</p>
                </Box>
                <Box display="flex" width={200} justifyContent="flex-start">
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
                </Box>
                <Box display="flex" width={200} justifyContent="flex-start">
                <DeleteIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleRemoveFromCart(item._id)}
                />
                </Box>
              </Box>
            );
          }
          return null;
        })
      )}
      {Object.keys(cart).length > 0 && (
        <div className="cart-total">
          <h2>Cart Summary</h2>
          <div className="price">
            <h4>Subtotal:</h4>
            <p>${subPrice.toFixed(2)}</p>
          </div>
          <Divider/>
          <div className="button">
          <Button
          fullWidth
            variant="contained"
            color="success"
            onClick={handleCheckClick}
          >
            Proceed to Checkout
          </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
