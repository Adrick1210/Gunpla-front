import React, { useEffect, useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

export default function Products() {
  const { products, productsLoader } = useContext(ProductContext);
  
  useEffect(()  => {
    try {
      productsLoader();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  });

  return (
    <div>
      {products.map((product) => {
        return (
        <div className="Product" key={product._id}>
        <img src={product.boxArt} alt="box-art" />
        <h1>{product.name}</h1>
       </div>
       )
      })}
   </div>
  );
}
