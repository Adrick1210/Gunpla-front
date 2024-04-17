import React, { createContext, useState, useEffect, ReactNode } from "react";

type Product = {
  _id: string;
  brand: string;
  name: string;
  boxArt: string;
  price: number;
  inventory: number;
  description: string;
  grade: string;
  scale: string;
  releaseDate: Date;
};

type ProviderProps = {
  children: ReactNode;
};

// for every new function, add into this type
type ProductContextType = {
  products: Product[];
  productsLoader: () => Promise<void>;
};

const initialState: ProductContextType = {
  products: [] as Product[],
  productsLoader: async () => {},
};

export const ProductContext = createContext<ProductContextType>(initialState);

export const ProductProvider = ({ children }: ProviderProps) => {
  const [products, setProducts] = useState([] as Product[]);

  const URL = process.env.REACT_APP_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${URL}/products`);
        const productsData = await res.json();
        setProducts(productsData.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [URL]);

  const productsLoader = async () => {
    try {
      const res = await fetch(`${URL}/products`);
      const productsData = await res.json();
      setProducts(productsData);
    } catch (err) {
      console.error("error fetching products", err);
    }
  };

  const contextValue: ProductContextType = {
    products,
    productsLoader,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
