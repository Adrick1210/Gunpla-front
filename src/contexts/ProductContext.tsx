import React, { createContext, useState, ReactNode } from "react";

export type Product = {
  _id: string;
  brand: string;
  name: string;
  boxArt: string;
  price: {$numberDecimal: number};
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
  productsLoader: (page: number) => Promise<void>;
  product: Product;
  productLoader: (id: string) => Promise<void>;
  page: number;
  totalPages: number;
};

const initialState: ProductContextType = {
  products: [] as Product[],
  productsLoader: async () => {},
  product: {} as Product,
  productLoader: async () => {},
  page: 1,
  totalPages: 0,
};

export const ProductContext = createContext<ProductContextType>(initialState);

export const ProductProvider = ({ children }: ProviderProps) => {
  const [products, setProducts] = useState([] as Product[]);
  const [product, setProduct] = useState({} as Product);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const URL = process.env.REACT_APP_URL;

   const productsLoader = async (page: number) => {
    try {
      const res = await fetch(`${URL}/products?page=${page}`);
      const productsData = await res.json();
      setProducts(productsData.products);
      setPage(productsData.currentPage);
      setTotalPages(productsData.totalPages)
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
    page,
    totalPages,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
