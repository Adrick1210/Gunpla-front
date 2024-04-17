import "./App.css";
import Nav from "./components/TopNav";
import { ProductProvider } from "./contexts/ProductContext";

function App() {
  return (
    <ProductProvider>
      <div className="App">
        <Nav />
      </div>
    </ProductProvider>
  );
}

export default App;
