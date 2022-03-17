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

  const addToCart = useCallback(async product => {
    try {
      const res = await axiosInstance.post('cart', {
        quantity: 1,
        productId: product.id,
      });
      setCart(prevVal => [...prevVal, res.data]);
    } catch (error) {}
  }, []);

  const updateQuantity = useCallback(async cartItem => {
    try {
      const res = await axiosInstance.put(
        `cart/${cartItem.id}`,
        cartItem,
      );
      setCart(prevValue => {
        const index = prevValue.findIndex(
          x => x.id === cartItem.id,
        );
        return [
          ...prevValue.slice(0, index),
          res.data,
          ...prevValue.slice(index + 1),
        ];
      });
    } catch (error) {}
  }, []);

  const deleteCartItem = useCallback(async cartItem => {
    try {
      await axiosInstance.delete(`cart/${cartItem.id}`);
      setCart(prevValue => {
        const index = prevValue.findIndex(
          x => x.id === cartItem.id,
        );
        return [
          ...prevValue.slice(0, index),
          ...prevValue.slice(index + 1),
        ];
      });
    } catch (error) {}
  });

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div>
      {products.map(product => {
        const cartItem = cart.find(
          x => x.productId === product.id,
        );
        return (
          <Product
            key={product.id}
            product={product}
            cartItem={cartItem}
            addToCart={addToCart}
            updateQuantity={updateQuantity}
            deleteCartItem={deleteCartItem}
          />
        );
      })}
    </div>
  );
};

export default Home;
