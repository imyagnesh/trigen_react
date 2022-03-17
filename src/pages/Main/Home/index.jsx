import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import axiosInstance from '../../../utils/axiosInstance';

const Home = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = useCallback(async () => {
    try {
      const res = await axiosInstance.get('660/products');
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
};

export default Home;
