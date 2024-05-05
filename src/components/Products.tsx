import { useEffect, useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid";

export default function Products() {
  const { products, productsLoader, page } = useContext(ProductContext);

  useEffect(() => {
    try {
      productsLoader(page);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{
      width: "80%",
      margin: "0 auto",
      justifyContent: "center",
    }}>
      <Grid container spacing={3} >
        {products.map((product) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <ProductCard  product={product} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
