import React, { useEffect, useContext } from 'react';
import Product from '../../../components/Product';
import { CartContext } from '../../../context/cartContext';
import { ProductsContext } from '../../../context/productsContext';

const Home = () => {
  const { products, loadProducts } =
    useContext(ProductsContext);
  const {
    cart,
    loadCart,
    addToCart,
    updateQuantity,
    deleteCartItem,
  } = useContext(CartContext);

  useEffect(() => {
    Promise.all([loadProducts(), loadCart()]);
  }, [loadProducts, loadCart]);

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
