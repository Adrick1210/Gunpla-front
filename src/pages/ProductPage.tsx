import Products from "../components/Products";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Index() {
  return (
    <div className="main-container">
      <div className="showcase">
        <img
          src="https://shop.bandaicollectors.com.mx/cdn/shop/collections/HeadersCategorias-1920-x-480-Gunpla.jpg?v=1703908536"
          alt="banner"
        />
      </div>
      <Products />

      <Stack spacing={2} paddingBottom={3} justifyContent={"center"} alignItems={"center"} paddingTop={3}>
        <Pagination count={10} shape="rounded" />
      </Stack>
    </div>
  );
}
export default Index;
