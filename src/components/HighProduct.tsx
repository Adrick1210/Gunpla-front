import React, { useEffect, useContext, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid";
import { Product } from "../contexts/ProductContext";

function HighProducts() {
  const grade = "High Grade";
  const { products, productsLoader, page } = useContext(ProductContext);
  const [highGradeProducts, setHighGradeProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      productsLoader(page);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter(
      (product) => product.grade === grade
    );
    setHighGradeProducts(filteredProducts);
  }, [products, grade]);

  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
      }}
    >
      {highGradeProducts.length > 0 ? (
        <Grid container spacing={3}>
          {highGradeProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No High Grade products available.</p>
      )}
    </div>
  );
}
export default HighProducts;
