import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import ProductPage from "./pages/ProductPage";
import ProductView from "./pages/ProductView";
import Cart from "./pages/Cart";
import Total from "./pages/Total";
import Order from "./pages/Order";
import Dashboard from "./admin/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<ProductPage />} />
      <Route path="/products/:id" element={<ProductView />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Total />} />
      <Route path="/confirmation" element={<Order />}/>
      <Route path="/admin" element={<Dashboard />}/>
    </Route>
    
  )
);

export default router;
