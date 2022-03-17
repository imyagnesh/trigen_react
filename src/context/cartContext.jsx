import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import axiosInstance from '../utils/axiosInstance';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const loadCart = useCallback(async () => {
    try {
      const res = await axiosInstance.get('660/cart');
      setCart(res.data);
    } catch (error) {}
  }, []);

  const addToCart = useCallback(async product => {
    try {
      const res = await axiosInstance.post('660/cart', {
        quantity: 1,
        productId: product.id,
      });
      setCart(prevVal => [...prevVal, res.data]);
    } catch (error) {}
  }, []);

  const updateQuantity = useCallback(async cartItem => {
    try {
      const res = await axiosInstance.put(
        `660/cart/${cartItem.id}`,
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
      await axiosInstance.delete(`660/cart/${cartItem.id}`);
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

  const value = useMemo(
    () => ({
      cart,
      loadCart,
      addToCart,
      updateQuantity,
      deleteCartItem,
    }),
    [
      cart,
      loadCart,
      addToCart,
      updateQuantity,
      deleteCartItem,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
