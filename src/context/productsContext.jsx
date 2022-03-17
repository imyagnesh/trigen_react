import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import axiosInstance from '../utils/axiosInstance';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const loadProducts = useCallback(async () => {
    try {
      const res = await axiosInstance.get('660/products');
      setProducts(res.data);
    } catch (error) {}
  }, []);

  const value = useMemo(
    () => ({ products, loadProducts }),
    [products, loadProducts],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
