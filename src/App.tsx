import "./App.css";
import Nav from "./components/TopNav";
import { ProductProvider } from "./contexts/ProductContext";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <ProductProvider>
      <div className="App">
        <Nav />
        <Outlet />
      </div>
    </ProductProvider>
  );
}

export default App;
