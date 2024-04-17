import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import ProductPage from "./pages/ProductPage";
import ProductView from "./pages/ProductView";
import Cart from "./pages/Cart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<ProductPage />} />
      <Route path="/products/:id" element={<ProductView/>}/>
      <Route path="/cart" element={<Cart/>}/>
    </Route>
  )
);

export default router;
