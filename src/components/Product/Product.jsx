import React from 'react';
import PropTypes from 'prop-types';
import Rating from '../Rating';

const Product = ({
  product,
  cartItem,
  isAdding,
  isUpdating,
  isDeleting,
  addToCart,
  updateQuantity,
  deleteCartItem,
}) => (
  <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6">
    <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
      <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-3">
        <img
          src={product.image}
          alt={product.title}
          className="object-center object-cover"
        />
      </div>
      <div className="sm:col-span-8 lg:col-span-9">
        <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
          {product.title}
        </h2>

        <section
          aria-labelledby="information-heading"
          className="mt-2">
          <h3 id="information-heading">
            {product.description}
          </h3>

          <p className="text-2xl text-gray-900">
            {new Intl.NumberFormat('en-IN', {
              currency: 'INR',
              style: 'currency',
            }).format(product.price)}
          </p>

          {/* Reviews */}
          <Rating {...product.rating} />
        </section>

        <section
          aria-labelledby="options-heading"
          className="mt-10">
          <h3 id="options-heading" className="sr-only">
            Product options
          </h3>

          {cartItem ? (
            <div className="flex items-center mt-6">
              <button
                type="button"
                disabled={isUpdating || isDeleting}
                onClick={() =>
                  updateQuantity({
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                  })
                }
                className=" w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                {(isUpdating || isDeleting) && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                +
              </button>
              <p className="mx-8 text-xl font-bold">
                {cartItem.quantity}
              </p>
              <button
                type="button"
                disabled={isUpdating || isDeleting}
                onClick={() => {
                  if (cartItem.quantity > 1) {
                    updateQuantity({
                      ...cartItem,
                      quantity: cartItem.quantity - 1,
                    });
                  } else {
                    deleteCartItem(cartItem);
                  }
                }}
                className=" w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                {(isUpdating || isDeleting) && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                -
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled={isAdding}
              onClick={() => addToCart(product)}
              className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
              {isAdding && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              Add to bag
            </button>
          )}
        </section>
      </div>
    </div>
  </div>
);

Product.propTypes = {
  product: PropTypes.exact({
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
  }).isRequired,
  cartItem: PropTypes.shape({
    quantity: PropTypes.number,
    productId: PropTypes.number,
    id: PropTypes.number,
  }),
  isAdding: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  addToCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
};

Product.defaultProps = {
  cartItem: undefined,
};

export default Product;
