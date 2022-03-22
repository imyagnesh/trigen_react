import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Product from '../../../components/Product';

const Home = ({
  products,
  productsLoading,
  loadProducts,
  loadCart,
}) => {
  useEffect(() => {
    Promise.all([loadProducts(), loadCart()]);
  }, [loadProducts, loadCart]);

  return (
    <div>
      {!!productsLoading && (
        <div className="fixed h-screen bg-opacity-70 flex justify-center items-center bg-gray-400 inset-0 z-10">
          <p className="text-4xl font-bold text-red-500">
            {productsLoading.message || 'Loading..'}
          </p>
        </div>
      )}
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

Home.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      description: PropTypes.string,
      category: PropTypes.string,
      image: PropTypes.string,
      rating: PropTypes.exact({
        rate: PropTypes.number,
        count: PropTypes.number,
      }),
    }),
  ).isRequired,
  productsLoading: PropTypes.shape({
    message: PropTypes.string,
  }),
  loadProducts: PropTypes.func.isRequired,
  loadCart: PropTypes.func.isRequired,
};

Home.defaultProps = {
  productsLoading: undefined,
};

export default Home;
