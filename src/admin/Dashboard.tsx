import { useContext, useEffect } from "react";
import { ProductContext } from "../contexts/ProductContext";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import AdminNav from "./AdminNav";

function Dashboard() {
  const { products, page, totalPages, productsLoader } =
    useContext(ProductContext);

  useEffect(() => {
    try {
      productsLoader(page);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    productsLoader(value);
  };

  return (
    <div>
      <AdminNav />
      <h2>Current Inventory:</h2>
      {products.map((product) => (
        <Box
          key={product._id}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap={3}
          margin="20px auto 0 auto"
        >
          <Box display="flex" width={250} justifyContent="flex-start">
            <h3 key={product._id}>{product.name}</h3>
          </Box>
          <Link
            to={`/admin/update/${product._id}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Box display="flex" width={100} justifyContent="center">
              <BorderColorIcon sx={{ cursor: "pointer" }} />
            </Box>
          </Link>
          <Box display="flex" width={100} justifyContent="center">
            <DeleteIcon sx={{ cursor: "pointer" }} />
          </Box>
        </Box>
      ))}
      <Stack
        spacing={2}
        paddingBottom={3}
        justifyContent={"center"}
        alignItems={"center"}
        paddingTop={3}
      >
        <Pagination
          count={totalPages}
          shape="rounded"
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
}
export default Dashboard;
