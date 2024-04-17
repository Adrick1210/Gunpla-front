import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

function Index() {
    const { products } = useContext(ProductContext);
  return (
    <div className="main-container">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSi0RQFctpbr7rsovODD0NiICt_dvfXDCIZjQpF9rdOA&s" alt="banner" />
      <div className="list">
        {products.map((product) => (
            <div className="Product" key={product._id}>
                <h1>{product.name}</h1>
            </div>
        ))}
      </div>
    </div>
  );
}
export default Index;
