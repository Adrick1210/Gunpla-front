import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";

 function ProductView() {
  const {product, productLoader} = useContext(ProductContext);
  const {id = ""} = useParams();

  useEffect(() => {
    try {
      productLoader(id);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);
  console.log(product)
  return (
    <div>
      ProductView
    </div>
  )
}
export default ProductView;