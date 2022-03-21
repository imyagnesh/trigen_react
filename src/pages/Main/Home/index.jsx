import React, {
  useEffect,
  useContext,
  useMemo,
} from 'react';
import Product from '../../../components/Product';
import { CartContext } from '../../../context/cartContext';
import { ProductsContext } from '../../../context/productsContext';

const Home = () => {
  const {
    products,
    loading: productsLoading,
    error: productsError,
    loadProducts,
  } = useContext(ProductsContext);
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

  const loadProductsLoading = useMemo(
    () =>
      productsLoading.find(
        x => x.actionType === 'LOAD_PRODUCTS',
      ),
    [productsLoading],
  );

  return (
    <div>
      {!!loadProductsLoading && (
        <div className="fixed h-screen bg-opacity-70 flex justify-center items-center bg-gray-400 inset-0 z-10">
          <p className="text-4xl font-bold text-red-500">
            {loadProductsLoading.message || 'Loading..'}
          </p>
        </div>
      )}
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
