import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import Product from '../../../components/Product';
import axiosInstance from '../../../utils/axiosInstance';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const res = await Promise.all([
        axiosInstance.get('660/products'),
        axiosInstance.get('660/cart'),
      ]);
      setProducts(res[0].data);
      setCart(res[1].data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(products);
  console.log(cart);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div>
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Home;
