import React, { createContext, useState, ReactNode, useEffect } from "react";

export type cartState = {
  [key: string]: number;
};

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
  quantity?: number;
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
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  populatedCart: Product[];
  populateCart: () => void;
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
  addToCart: (productId: string) => {},
  removeFromCart: (productId: string) => {},
  populatedCart: [] as Product[],
  populateCart: () => {},
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
  const [populatedCart, setPopulatedCart] = useState<Product[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  const URL = process.env.REACT_APP_URL;

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const count = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
    setCartItemCount(count);
  }, [cart]);

  useEffect(() => {
    populateCart();
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

  const addToCart = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      updatedCart[productId] = (updatedCart[productId] || 0) + 1;
      console.log(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId] && updatedCart[productId] > 0) {
        updatedCart[productId]--;
        if (updatedCart[productId] === 0) {
          delete updatedCart[productId];
        }
      }
      return updatedCart;
    });
  };

  async function fetchProduct(productId: string): Promise<Product> {
    const res = await fetch(`${URL}/products/${productId}`);
    if (!res.ok) {
      throw new Error(`Error fetching product ${productId}: ${res.statusText}`);
    }
    const productData = await res.json();
    return productData as Product;
  }

  const populateCart = async () => {
    try {
      const productsWithQuantity: Product[] = [];

      for (const productId in cart) {
        const product = await fetchProduct(productId);
        product.quantity = cart[productId];
        productsWithQuantity.push(product);
      }

      setPopulatedCart(productsWithQuantity);
    } catch (err) {
      console.error("error fetching products", err);
    }
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
    populatedCart,
    populateCart,
    cartItemCount,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
