import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const paymentHandler = async () => {
    try {
      await payOrder({ orderId, details: {} }).unwrap();
      refetch();
      toast.success("Payment marked as completed");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <div className="flex justify-center items-center min-h-screen">
      <Loader />
    </div>
  ) : error ? (
    <div className="container mx-auto p-4 mt-[5rem]">
      <Message variant="danger">{error?.data?.message || error.message || "Failed to load order"}</Message>
    </div>
  ) : (
    <div className="container mx-auto p-4 mt-[5rem]">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Order Details</h1>
          <Link
            to="/user-orders"
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Orders
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-600">
                        <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">Product</th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-900 dark:text-white">Qty</th>
                        <th className="text-right py-3 px-2 font-semibold text-gray-900 dark:text-white">Price</th>
                        <th className="text-right py-3 px-2 font-semibold text-gray-900 dark:text-white">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-600">
                          <td className="py-4 px-2">
                            <div className="flex items-center space-x-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/64x64/f0f0f0/666666?text=No+Image";
                                }}
                              />
                              <div>
                                <Link
                                  to={`/product/${item.product}`}
                                  className="font-medium text-gray-900 dark:text-white hover:text-pink-600 transition-colors"
                                >
                                  {item.name}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-2 text-center text-gray-900 dark:text-white">{item.qty}</td>
                          <td className="py-4 px-2 text-right text-gray-900 dark:text-white">
                            {item.price?.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                          <td className="py-4 px-2 text-right font-semibold text-gray-900 dark:text-white">
                            {(item.qty * item.price)?.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {/* Shipping Information */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Shipping Information</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Order ID:</span>
                  <p className="text-gray-900 dark:text-white font-mono text-sm">#{order._id}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Customer:</span>
                  <p className="text-gray-900 dark:text-white">{order.user.username}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Email:</span>
                  <p className="text-gray-900 dark:text-white">{order.user.email}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Address:</span>
                  <p className="text-gray-900 dark:text-white">
                    {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Method:</span>
                  <p className="text-gray-900 dark:text-white">{order.paymentMethod}</p>
                </div>
                <div className="pt-2">
                  {order.isPaid ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Paid on {new Date(order.paidAt).toLocaleDateString('en-IN')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      Payment Pending
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Items:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {order.itemsPrice?.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {order.shippingPrice?.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {order.taxPrice?.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                    <span className="text-lg font-bold text-pink-600">
                      {order.totalPrice?.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            {!order.isPaid && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment</h3>

                {order.paymentMethod === "Cash on Delivery" ? (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">Cash on Delivery</h4>
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                          Payment will be collected when the order is delivered. Please keep the exact amount ready.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <div className="flex items-start">
                        <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <h4 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-1">Payment via {order.paymentMethod}</h4>
                          <p className="text-sm text-yellow-800 dark:text-yellow-300">
                            Complete your payment using {order.paymentMethod} and click the button below to confirm.
                          </p>
                        </div>
                      </div>
                    </div>

                    {loadingPay ? (
                      <div className="flex justify-center py-4">
                        <Loader />
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                        onClick={paymentHandler}
                      >
                        Mark as Paid
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Admin Actions */}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Admin Actions</h3>
                {loadingDeliver ? (
                  <div className="flex justify-center py-4">
                    <Loader />
                  </div>
                ) : (
                  <button
                    type="button"
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
