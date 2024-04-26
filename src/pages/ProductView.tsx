import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function ProductView() {
  const { product, productLoader, addToCart } = useContext(ProductContext);
  const { id = "" } = useParams();

  useEffect(() => {
    try {
      productLoader(id);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToCart = () => {
    addToCart(product._id, product);
    // alert("Item added to cart!")
  };

  return (
    <div className="product-container">
      <div className="product-card">
        <div className="product-image">
          <img src={product.boxArt} alt="box-art" />
        </div>
        <div className="product-information">
          <div className="product-name">
            <h1>{product.name}</h1>
            <h4> Brand: {product.brand}</h4>
          </div>
          <div className="product-numbers">
            <h3>${product.price?.$numberDecimal}</h3>
            <h5>In Stock: {product.inventory}</h5>
          </div>
          <Button variant="contained" color="success" onClick={handleAddToCart}>
            <AddShoppingCartIcon />
            Add to Cart
          </Button>
          <div className="description">
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductView;
