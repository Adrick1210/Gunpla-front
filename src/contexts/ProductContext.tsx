import React, { createContext, useState, ReactNode } from "react";

export type Product = {
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
  product: Product;
  productLoader: (id: string) => Promise<void>;
};

const initialState: ProductContextType = {
  products: [] as Product[],
  productsLoader: async () => {},
  product: {} as Product,
  productLoader: async () => {},
};

export const ProductContext = createContext<ProductContextType>(initialState);

export const ProductProvider = ({ children }: ProviderProps) => {
  const [products, setProducts] = useState([] as Product[]);
  const [product, setProduct] = useState({} as Product);

  const URL = process.env.REACT_APP_URL;

   const productsLoader = async () => {
    try {
      const res = await fetch(`${URL}/products`);
      const productsData = await res.json();
      setProducts(productsData.products);
    } catch (err) {
      console.error("error fetching products", err);
    }
  };

  const productLoader = async (id: string) => {
    try {
       const res = await fetch(`${URL}/products/${id}`)
       const productData = await res.json();
       setProduct(productData);
    } catch (err) {
      console.error("error fetching product", err);
    }
  }

  const contextValue: ProductContextType = {
    products,
    productsLoader,
    product,
    productLoader,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
