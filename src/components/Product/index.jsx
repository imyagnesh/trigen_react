import React from 'react';
import Rating from '../Rating';

const Product = ({
  product,
  addToCart,
  cartItem,
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
                onClick={() =>
                  updateQuantity({
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                  })
                }
                className=" w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                +
              </button>
              <p className="mx-8 text-xl font-bold">
                {cartItem.quantity}
              </p>
              <button
                type="button"
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
                className=" w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                -
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add to bag
            </button>
          )}
        </section>
      </div>
    </div>
  </div>
);

export default Product;
