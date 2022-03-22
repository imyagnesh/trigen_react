import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { XIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';

const CartDialog = ({
  open,
  cart,
  products,
  deleteCartItem,
  toggleCart,
}) => (
  <Transition.Root show={open} as={Fragment}>
    <Dialog
      as="div"
      className="fixed inset-0 overflow-hidden"
      onClose={toggleCart}>
      <div className="absolute inset-0 overflow-hidden">
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      {' '}
                      Shopping cart{' '}
                    </Dialog.Title>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => toggleCart(false)}>
                        <span className="sr-only">
                          Close panel
                        </span>
                        <XIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {cart.map(cartItem => {
                          const product = products.find(
                            x =>
                              x.id === cartItem.productId,
                          );
                          return (
                            <li
                              key={product.id}
                              className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a
                                        href={product.href}>
                                        {' '}
                                        {product.title}{' '}
                                      </a>
                                    </h3>
                                    <p className="ml-4">
                                      {new Intl.NumberFormat(
                                        'en-IN',
                                        {
                                          currency: 'INR',
                                          style: 'currency',
                                        },
                                      ).format(
                                        product.price,
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">
                                    Qty {cartItem.quantity}
                                  </p>

                                  <div className="flex">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        deleteCartItem(
                                          cartItem,
                                        )
                                      }
                                      className="font-medium text-indigo-600 hover:text-indigo-500">
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>
                      {new Intl.NumberFormat('en-IN', {
                        currency: 'INR',
                        style: 'currency',
                      }).format(
                        cart.reduce((p, c) => {
                          const product = products.find(
                            x => x.id === c.productId,
                          );
                          return (
                            p + c.quantity * product.price
                          );
                        }, 0),
                      )}
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at
                    checkout.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#checkout"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => toggleCart(false)}>
                        Continue Shopping
                        <span aria-hidden="true">
                          {' '}
                          &rarr;
                        </span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);

CartDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
  toggleCart: PropTypes.func.isRequired,
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
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number,
      productId: PropTypes.number,
      id: PropTypes.number,
      loaderId: PropTypes.number,
    }).isRequired,
  ).isRequired,
};

export default CartDialog;
