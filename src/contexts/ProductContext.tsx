import React, { createContext, useState, ReactNode, useEffect } from "react";

export type Product = {
  _id: string;
  brand: string;
  name: string;
  boxArt: string;
  price: { $numberDecimal: number };
  inventory: number;
  description: string;
  grade: string;
  scale: string;
  releaseDate: Date;
  quantity: number;
};

export type cartState = {
  [key: string]: {
    quantity: number;
    product?: Product;
  };
};

type ProviderProps = {
  children: ReactNode;
};

// for every new function, add into this type
type ProductContextType = {
  products: Product[];
  productsLoader: (page: number) => Promise<void>;
  product: Product;
  productLoader: (id: string) => Promise<void>;
  page: number;
  totalPages: number;
  cart: cartState;
  addToCart: (productId: string, product: Product) => void;
  removeFromCart: (productId: string) => void;
  editCartItem: (productId: string, newQuantity: number) => void;
  cartItemCount: number;
};

const initialState: ProductContextType = {
  products: [] as Product[],
  productsLoader: async () => {},
  product: {} as Product,
  productLoader: async () => {},
  page: 1,
  totalPages: 0,
  cart: {},
  addToCart: (productId: string, product: Product) => {},
  removeFromCart: (productId: string) => {},
  editCartItem: (productId: string, newQuantity: number) => {},
  cartItemCount: 0,
};

export const ProductContext = createContext<ProductContextType>(initialState);

export const ProductProvider = ({ children }: ProviderProps) => {
  const [products, setProducts] = useState([] as Product[]);
  const [product, setProduct] = useState({} as Product);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [cart, setCart] = useState<cartState>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {};
  });
  const [cartItemCount, setCartItemCount] = useState(0);

  const URL = process.env.REACT_APP_URL;

  useEffect(() => {
    const count = Object.values(cart).reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    setCartItemCount(count);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const productsLoader = async (page: number) => {
    try {
      const res = await fetch(`${URL}/products?page=${page}`);
      const productsData = await res.json();
      setProducts(productsData.products);
      setPage(productsData.currentPage);
      setTotalPages(productsData.totalPages);
    } catch (err) {
      console.error("error fetching products", err);
    }
  };

  const productLoader = async (id: string) => {
    try {
      const res = await fetch(`${URL}/products/${id}`);
      const productData = await res.json();
      setProduct(productData);
    } catch (err) {
      console.error("error fetching product", err);
    }
  };

  const addToCart = (productId: string, product: Product) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (!updatedCart[productId]) {
        updatedCart[productId] = {
          product,
          quantity: 1,
        };
      } else {
        updatedCart[productId].quantity =
          (updatedCart[productId].quantity || 0) + 1;
      }
      return updatedCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId]) {
        delete updatedCart[productId];
      }
      return updatedCart;
    });
  };

  const editCartItem = (productId: string, newQuantity: number) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };

      updatedCart[productId].quantity = newQuantity;

      return updatedCart;
    });
  };

  const contextValue: ProductContextType = {
    products,
    productsLoader,
    product,
    productLoader,
    page,
    totalPages,
    cart,
    addToCart,
    removeFromCart,
    editCartItem,
    cartItemCount,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
