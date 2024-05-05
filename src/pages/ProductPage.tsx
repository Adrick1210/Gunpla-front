import Products from "../components/Products";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Carousel from "../components/Carousel";
import { useContext, useEffect } from "react";
import { ProductContext } from "../contexts/ProductContext";

function Index() {
  const { page, totalPages, productsLoader } = useContext(ProductContext);

  useEffect(() => {
    window.scroll(0,0);
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    productsLoader(value);
  };

  return (
    <div className="main-container">
      <Carousel />
      <Products />

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
export default Index;
