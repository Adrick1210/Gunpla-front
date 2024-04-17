import React, { useEffect, useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid";

export default function Products() {
  const { products, productsLoader } = useContext(ProductContext);

  useEffect(() => {
    try {
      productsLoader();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  return (
    <div style={{
      width: "80%",
      margin: "0 auto"
    }}>
      <Grid container spacing={2} >
        {products.map((product) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard  product={product} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
