import { useContext, useEffect } from "react";
import { ProductContext } from "../contexts/ProductContext";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";

function Dashboard() {
  const { products, page, productsLoader } = useContext(ProductContext);

  useEffect(() => {
    try {
      productsLoader(page);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Admin Portal</h1>
      <h2>Item List:</h2>
      {products.map((product) => (
        <Box key={product._id}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={3}
        margin="20px auto 0 auto">
        <Box>
          <h3 key={product._id}>
            {product.name}
          </h3>
        </Box>
        <Box>
        <BorderColorIcon
          sx={{ cursor: "pointer" }}
        />
      </Box>
        <Box>
        <DeleteIcon
          sx={{ cursor: "pointer" }}
        />
      </Box>
      </Box>
      ))}
    </div>
  );
}
export default Dashboard;
